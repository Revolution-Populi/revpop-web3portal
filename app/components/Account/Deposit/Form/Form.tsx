import React, {useEffect, useState} from "react";
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
import AccountSelector from "../../AccountSelector";
import AccountStore from "../../../../stores/AccountStore";
import {EESSettings} from "../../../../Context/EES/Domain/EES/RepositoryInterface";
import HashLockField from "./SecretHashLock/Index";
import AmountField from "./AmountField";
import TimeLock from "./TimeLock";
import {
    SubmitDepositRequest,
    submitDepositRequestHandler
} from "../../../../Context/EES";

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

interface Props {
    settings: EESSettings;
    form: any;
    from: string;
    selectedAccountName: string;
}

//TODO::check existing payment
function DepositForm({settings, form, selectedAccountName}: Props) {
    const history = useHistory();

    const minValue = parseFloat(Web3.utils.fromWei(settings.minimumValue));

    const [accountName, setAccountName] = useState<string>(selectedAccountName);
    const [account, setAccount] = useState<Map<string, any>>();
    const [value, setValue] = useState(minValue);
    const [hashLock, setHashLock] = useState<string>("");
    const [timeLock, setTimeLock] = useState<Moment>(
        moment()
            .add(settings.minimumTimeLock, "minutes")
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

        const command = new SubmitDepositRequest(
            accountName,
            Web3.utils.toWei(value.toString()),
            hashLock,
            timeLock
        );
        const sessionId = await submitDepositRequestHandler.execute(command);

        history.push(`/deposit/${sessionId}`);
    }

    function onAccountChangedHandler(account: any) {
        setAccountName(account.get("name"));
    }

    function onChangeValueHandler(value: number) {
        setValue(value);
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
        <Form
            {...formItemLayout}
            onSubmit={handleSubmit}
            className="deposit-form"
        >
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
                amount={value}
                minAmount={parseFloat(
                    Web3.utils.fromWei(settings.minimumValue)
                )}
                onChange={onChangeValueHandler}
            />
            <HashLockField
                form={form}
                hashLock={hashLock}
                onChange={onChangeHashLockHandler}
            />
            <TimeLock
                timeLock={timeLock}
                minTimeLock={settings.minimumTimeLock}
                onChange={onChangeTimeLockHandler}
            />
            <Form.Item wrapperCol={{span: 12, offset: 4}}>
                <Button type="primary" htmlType="submit">
                    <Translate content="deposit.create" />
                </Button>
            </Form.Item>
        </Form>
    );
}

const DepositFormWrapped = Form.create({name: "depositForm"})(DepositForm);

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
