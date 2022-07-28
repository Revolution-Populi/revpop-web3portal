import React, {useEffect, useState} from "react";
import Web3 from "web3";
// @ts-ignore
import {connect} from "alt-react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Button, DatePicker} from "bitshares-ui-style-guide";
import moment, {Moment} from "moment";
import {Map} from "immutable";
// @ts-ignore
import {ChainStore} from "@revolutionpopuli/revpopjs";
import AccountSelector from "../../AccountSelector";
import AccountStore from "../../../../stores/AccountStore";
import {MakeDeposit, makeDepositHandler} from "../../../../Context/Deposit";
import HashLockField from "./HashLockField";
import AmountField from "./AmountField";

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

function disabledDate(current: Moment) {
    return current && current < moment().endOf("day");
}

interface Props {
    from: string;
    selectedAccountName: string;
    onConfirmed: (
        txHash: string,
        amount: number,
        hashLock: string,
        timeout: Moment
    ) => void;
}

//TODO:: add validation to the fields
function DepositForm({from, onConfirmed, selectedAccountName}: Props) {
    const [accountName, setAccountName] = useState<string>(selectedAccountName);
    const [account, setAccount] = useState<Map<string, any>>();
    const [amount, setAmount] = useState(0.01);
    const [hashLock, setHashLock] = useState<string>("");
    const [timeout, setTimeout] = useState<Moment>(moment().add("1", "days"));

    useEffect(() => {
        setAccount(ChainStore.getAccount(accountName));
    }, [accountName]);

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const command = new MakeDeposit(
            "metamask",
            from,
            accountName,
            Web3.utils.toWei(amount.toString()),
            hashLock,
            timeout.unix()
        );
        const result = await makeDepositHandler.execute(command);

        if (result.isSuccess()) {
            onConfirmed(result.txHash, amount, hashLock, timeout);
        } else {
            // TODO::show error
        }
    }

    function onAccountChangedHandler(account: any) {
        setAccountName(account.get("name"));
    }

    function onChangeAmountHandler(amount: number) {
        setAmount(amount);
    }

    function onChangeTimeoutHandler(timeout: Moment) {
        setTimeout(timeout);
    }

    function onChangeHashLockHandler(hashLock: string) {
        setHashLock(hashLock);
    }

    if (!account) {
        return <></>;
    }

    return (
        <Form {...formItemLayout} onSubmit={handleSubmit}>
            <div className="text-center">
                <Translate content="deposit.title" component="h4" />
            </div>
            <AccountSelector
                label="deposit.account"
                accountName={account.get("name")}
                account={account}
                typeahead={true}
                locked={true}
                onAccountChanged={onAccountChangedHandler}
            />
            <AmountField amount={amount} onChange={onChangeAmountHandler} />
            <HashLockField
                hashLock={hashLock}
                onChange={onChangeHashLockHandler}
            />
            <Form.Item label={counterpart.translate("deposit.timeout")}>
                <DatePicker
                    showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                        format: "HH:mm"
                    }}
                    onChange={onChangeTimeoutHandler}
                    disabledDate={disabledDate}
                    defaultValue={timeout}
                />
            </Form.Item>
            <Form.Item wrapperCol={{span: 12, offset: 4}}>
                <Button type="primary" htmlType="submit">
                    <Translate content="deposit.metamask" />
                </Button>
            </Form.Item>
        </Form>
    );
}

export default connect(DepositForm, {
    listenTo() {
        return [AccountStore];
    },
    getProps(props: any) {
        return {
            selectedAccountName: AccountStore.getState().currentAccount
        };
    }
});
