import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Web3 from "web3";
// @ts-ignore
import {connect} from "alt-react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import {Form, Button} from "bitshares-ui-style-guide";
import {Map} from "immutable";
// @ts-ignore
import {ChainStore, FetchChain} from "@revolutionpopuli/revpopjs";
import AccountSelector from "../../AccountSelector";
import AccountStore from "../../../../stores/AccountStore";
import HashLockField from "./SecretHashLock/Index";
import AmountField from "./AmountField";
import Address from "./Address";
import utils from "../../../../lib/common/utils";
import FeeAssetSelector from "./FeeAssetSelector";
import Fee from "../../../../Context/Fees/Domain/Fee";
import {EESSettings} from "../../../../Context/EES/Domain/EES/RepositoryInterface";
import {
    CalcWithdrawTransactionFee,
    calcWithdrawTransactionFee,
    SubmitWithdrawRequest,
    submitWithdrawRequestHandler
} from "../../../../Context/EES";

const formItemLayout = {
    labelCol: {
        span: 7
    },
    wrapperCol: {
        span: 17
    }
};

interface Props {
    settings: EESSettings;
    form: any;
    from: string;
    selectedAccountName: string;
}

interface Totals {
    [index: string]: number;
}

//TODO::check existing payment
function WithdrawForm({settings, form, selectedAccountName}: Props) {
    const history = useHistory();
    const minValue = parseFloat(Web3.utils.fromWei(settings.minimumValue));
    const [accountName, setAccountName] = useState<string>(selectedAccountName);
    const [account, setAccount] = useState<Map<string, any>>();
    const [value, setValue] = useState(minValue);
    const [hashLock, setHashLock] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [withdrawalFee, setWithdrawalFee] = useState<Fee>(
        Fee.create("1.3.0", 0)
    );
    const [transactionFee, setTransactionFee] = useState<Fee>(
        Fee.create("1.3.0", 0)
    );
    const [totals, setTotals] = useState<Totals>({});
    const [accountBalances, setAccountBalances] = useState<Map<
        string,
        any
    > | null>(null);

    useEffect(() => {
        setAccount(ChainStore.getAccount(accountName));
    }, [accountName]);

    useEffect(() => {
        if (!account) {
            return;
        }

        setAccountBalances(
            account.get("balances").map((x: any) => {
                const balanceAmount = ChainStore.getObject(x);

                if (!balanceAmount.get("balance")) {
                    return null;
                }

                return balanceAmount;
            })
        );
        onChangeTransactionFeeCurrencyHandler(transactionFee.code);
        onChangeWithdrawalFeeCurrencyHandler(withdrawalFee.code);
    }, [account]);

    useEffect(() => {
        if (!accountBalances || !withdrawalFee || !transactionFee) {
            return;
        }

        getTotalsAmounts(accountBalances).then(totals => {
            setTotals(totals);
        });
    }, [account, value, withdrawalFee, transactionFee]);

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        let errors = false;

        form.validateFieldsAndScroll((error: any, values: any) => {
            if (error) {
                errors = true;
            }
        });

        if (errors) {
            return;
        }

        const command = new SubmitWithdrawRequest(
            accountName,
            value,
            withdrawalFee.code,
            withdrawalFee.value,
            transactionFee.code,
            transactionFee.value,
            hashLock,
            address
        );
        const sessionId = await submitWithdrawRequestHandler.execute(command);

        history.push(`/withdraw/${sessionId}`);
    }

    async function getTotalsAmounts(accountBalances: any) {
        const totals: Totals = {};

        for (const key of accountBalances.keys()) {
            totals[key] = 0;

            if (key == "1.3.1") {
                totals[key] += value;
            }

            if (withdrawalFee && withdrawalFee.code == key) {
                totals[key] += withdrawalFee.value;
            }

            if (transactionFee && transactionFee.code == key) {
                totals[key] += transactionFee.value;
            }
        }

        return totals;
    }

    function onAccountChangedHandler(account: any) {
        setAccountName(account.get("name"));
    }

    function onChangeValueHandler(value: number) {
        setValue(value);
    }

    function onChangeAddressHandler(address: string) {
        setAddress(address);
    }

    function onChangeHashLockHandler(hashLock: string) {
        setHashLock(hashLock);
    }

    function onChangeWithdrawalFeeCurrencyHandler(assetId: string) {
        let fee: number;

        switch (assetId) {
            case "1.3.0":
                fee = settings.rvpWithdrawalFee;
                break;
            case "1.3.1":
                fee = settings.rvethWithdrawalFee;
                break;
            default:
                fee = 0;
        }

        setWithdrawalFee(Fee.create(assetId, fee));
    }

    async function onChangeTransactionFeeCurrencyHandler(assetId: string) {
        if (!account) {
            return;
        }

        const command = new CalcWithdrawTransactionFee(assetId, account);
        const fee = Fee.create(
            assetId,
            await calcWithdrawTransactionFee.execute(command)
        );

        setTransactionFee(fee);
    }

    function getRealAmount(balance: any): number {
        let amount = balance.get("balance");

        if (amount || amount == 0) {
            amount = Number(balance.get("balance"));
        } else {
            return 0;
        }

        let asset = ChainStore.getObject(balance.get("asset_type"));
        if (asset && asset.toJS) {
            asset = asset.toJS();
        }

        const precision = utils.get_asset_precision(asset.precision);

        return amount / precision;
    }

    function formatAsset(balance: any): string {
        const value = getRealAmount(balance);

        let asset = ChainStore.getObject(balance.get("asset_type"));
        if (asset && asset.toJS) {
            asset = asset.toJS();
        }

        return value.toString() + " " + asset.symbol;
    }

    async function validateAmount() {
        if (!accountBalances) {
            return;
        }

        for (const assetId in totals) {
            const balance = accountBalances.get(assetId);

            if (getRealAmount(balance) < totals[assetId]) {
                return Promise.reject(
                    new Error(
                        "You have only " +
                            formatAsset(balance) +
                            " on your balance which is insufficient."
                    )
                );
            }
        }
    }

    function getAssets(accountBalances: any) {
        if (!accountBalances) {
            return [];
        }

        const assets: string[] = [];

        for (const asset of accountBalances.keys()) {
            assets.push(asset);
        }

        return assets;
    }

    if (!account) {
        return <></>;
    }

    return (
        <Form
            {...formItemLayout}
            onSubmit={handleSubmit}
            className="withdraw-form"
        >
            <div className="text-center">
                <Translate content="withdraw.title" component="h4" />
            </div>
            <AccountSelector
                label="form.account.label"
                accountName={account.get("name")}
                account={account}
                typeahead={true}
                locked={true}
                onAccountChanged={onAccountChangedHandler}
            />
            <AmountField
                form={form}
                amount={value}
                minAmount={parseFloat(
                    Web3.utils.fromWei(settings.minimumValue)
                )}
                onChange={onChangeValueHandler}
                validateCallback={validateAmount}
            />
            <FeeAssetSelector
                label={"withdraw.form.label.currency_to_pay_withdrawal_fee"}
                selectedAsset={withdrawalFee.code}
                value={withdrawalFee.value}
                assets={getAssets(accountBalances)}
                onChange={onChangeWithdrawalFeeCurrencyHandler}
            />
            <FeeAssetSelector
                label={"withdraw.form.label.currency_to_pay_transaction_fee"}
                selectedAsset={transactionFee.code}
                value={transactionFee.value}
                assets={getAssets(accountBalances)}
                onChange={onChangeTransactionFeeCurrencyHandler}
            />
            <HashLockField
                form={form}
                hashLock={hashLock}
                onChange={onChangeHashLockHandler}
            />
            <Address
                value={address}
                onChange={onChangeAddressHandler}
                form={form}
            />
            <Form.Item wrapperCol={{span: 17, offset: 7}}>
                <Button type="primary" htmlType="submit">
                    <Translate content="withdraw.create" />
                </Button>
            </Form.Item>
        </Form>
    );
}

const WithdrawFormWrapped = Form.create({name: "withdrawForm"})(WithdrawForm);

export default connect(WithdrawFormWrapped, {
    listenTo() {
        return [AccountStore];
    },
    getProps(props: any) {
        return {
            selectedAccountName: AccountStore.getState().currentAccount
        };
    }
});
