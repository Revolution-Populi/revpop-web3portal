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
import {ChainStore} from "@revolutionpopuli/revpopjs";
import AccountSelector from "../../AccountSelector";
import AccountStore from "../../../../stores/AccountStore";
import {DepositSettings} from "../../../../Context/Deposit/Domain/EES/RepositoryInterface";
import HashLockField from "./SecretHashLock/Index";
import AmountField from "./AmountField";
import {
    SubmitWithdrawRequest,
    submitWithdrawRequestHandler
} from "../../../../Context/Withdraw";
import Address from "./Address";
import Currency from "./Currency";

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

interface Props {
    settings: DepositSettings;
    form: any;
    from: string;
    selectedAccountName: string;
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
    const [currency, setCurrency] = useState<string>("");
    const [withdrawalFeeCurrency, setWithdrawalFeeCurrency] = useState<string>(
        ""
    );
    const [defaultAssets, setDefaultAssets] = useState<string>("");

    useEffect(() => {
        setAccount(ChainStore.getAccount(accountName));
    }, [accountName]);

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
            Web3.utils.toWei(value.toString()),
            hashLock,
            address
        );
        const sessionId = await submitWithdrawRequestHandler.execute(command);

        history.push(`/withdraw/${sessionId}`);
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

    function onChangeCurrencyHandler(currency: string) {
        setCurrency(currency);
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
            />
            {/*<Currency*/}
            {/*    form={form}*/}
            {/*    currency={withdrawalFeeCurrency}*/}
            {/*    defaultAssets={defaultAssets}*/}
            {/*    onChange={onChangeCurrencyHandler}*/}
            {/*    label={"withdrawal.form.label.currency_to_pay_withdrawal"}*/}
            {/*    tooltip={*/}
            {/*        "withdrawal.form.tooltip.currency_to_pay_withdrawal_fee"*/}
            {/*    }*/}
            {/*    requiredMessage={"withdraw.form.select.withdrawal_fee_currency"}*/}
            {/*/>*/}
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
            <Form.Item wrapperCol={{span: 12, offset: 4}}>
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
