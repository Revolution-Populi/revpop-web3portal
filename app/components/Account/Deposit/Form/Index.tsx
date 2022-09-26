import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Web3 from "web3";
// @ts-ignore
import {connect} from "alt-react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import {Form, Button} from "bitshares-ui-style-guide";
import moment, {Moment} from "moment";
import {Map} from "immutable";
// @ts-ignore
import {ChainStore} from "@revolutionpopuli/revpopjs";
import {SessionContext} from "../Methods/Index";
import AccountSelector from "../../AccountSelector";
import AccountStore from "../../../../stores/AccountStore";
import {Session, MakeDeposit, makeDepositHandler} from "../../../../Context/Deposit";
import HashLockField from "./SecretHashLock/Index";
import AmountField from "./AmountField";
import TimeLock from "./TimeLock";

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

interface Props {
    form: any;
    from: string;
    selectedAccountName: string;
}

//TODO:: add validation to the fields
function DepositForm({form, from, selectedAccountName}: Props) {
    const history = useHistory();
    const session = useContext(SessionContext) as Session;
    const [accountName, setAccountName] = useState<string>(selectedAccountName);
    const [account, setAccount] = useState<Map<string, any>>();
    const [amount, setAmount] = useState(0.01);
    const [hashLock, setHashLock] = useState<string>("");
    const [timeLock, setTimeLock] = useState<Moment>(
        moment()
            .add(session.minimumTimeLock, "minutes")
            .add(1, "day")
            .startOf("day")
    );

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

        const command = new MakeDeposit(
            "metamask",
            from,
            session.id,
            accountName,
            Web3.utils.toWei(amount.toString()),
            hashLock,
            timeLock.unix()
        );

        const sessionOrError = await makeDepositHandler.execute(command);

        if (sessionOrError.isSuccess()) {
            const session = sessionOrError.value;

            history.push(`/deposit/${session.id}`);
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

    function onChangeTimeLockHandler(timeLock: Moment) {
        setTimeLock(timeLock);
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
                label="deposit.form.account.label"
                accountName={account.get("name")}
                account={account}
                typeahead={true}
                locked={true}
                onAccountChanged={onAccountChangedHandler}
            />
            <AmountField
                form={form}
                amount={amount}
                minAmount={session.minimumAmount}
                onChange={onChangeAmountHandler}
            />
            <HashLockField form={form} hashLock={hashLock} onChange={onChangeHashLockHandler} />
            <TimeLock timeLock={timeLock} minTimeLock={session.minimumTimeLock} onChange={onChangeTimeLockHandler} />
            <Form.Item wrapperCol={{span: 12, offset: 4}}>
                <Button type="primary" htmlType="submit">
                    <Translate content="deposit.metamask" />
                </Button>
            </Form.Item>
        </Form>
    );
}

const DepositFormWrapped = Form.create({name: "amountField"})(DepositForm);

export default connect(DepositFormWrapped, {
    listenTo() {
        return [AccountStore];
    },
    getProps(props: any) {
        return {
            selectedAccountName: AccountStore.getState().currentAccount
        };
    }
});
