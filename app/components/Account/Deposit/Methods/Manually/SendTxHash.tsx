import React, {useEffect, useState} from "react";
// @ts-ignore
import {connect} from "alt-react";
// @ts-ignore
import {ChainStore} from "@revolutionpopuli/revpopjs";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Input, Button} from "bitshares-ui-style-guide";
import {SendTxHash as SendTxHashCommand, sendTxHashHandler} from "../../../../../Context/Deposit";
import AccountSelector from "../../../AccountSelector";
import AccountStore from "../../../../../stores/AccountStore";
import {Map} from "immutable";

interface Props {
    form: any;
    selectedAccountName: string;
}

function SendTxHash({form, selectedAccountName}: Props) {
    const {getFieldDecorator} = form;
    const [txHash, setTxHash] = useState<string>();
    const [hashLock, setHashLock] = useState<string>();
    const [accountName, setAccountName] = useState<string>(selectedAccountName);
    const [account, setAccount] = useState<Map<string, any>>();

    useEffect(() => {
        setAccount(ChainStore.getAccount(accountName));
    }, [accountName]);

    function handleSubmit(event: SubmitEvent) {
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

        const command = new SendTxHashCommand(txHash as string, accountName, hashLock as string);
        const result = sendTxHashHandler.execute(command);
    }

    const formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    };

    function onAccountChangedHandler(account: any) {
        setAccountName(account.get("name"));
    }

    function onChangeSecretHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setTxHash(event.currentTarget.value);
    }

    function onChangeHashLockHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setHashLock(event.currentTarget.value);
    }

    if (!account) {
        return <></>;
    }

    return (
        <>
            <div className="text-center redeem">
                <Translate content="deposit.send_tx_hash.title" component="h4" />
            </div>
            <div className="redeem">
                <Form {...formItemLayout} onSubmit={handleSubmit}>
                    <AccountSelector
                        label="deposit.account"
                        accountName={account.get("name")}
                        account={account}
                        typeahead={true}
                        locked={true}
                        onAccountChanged={onAccountChangedHandler}
                    />

                    <Form.Item label={counterpart.translate("deposit.send_tx_hash.tx_hash")}>
                        {getFieldDecorator("secret", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter the transaction hash!"
                                },
                                {
                                    //Regexp validation
                                }
                            ]
                        })(<Input onChange={onChangeSecretHandler} />)}
                    </Form.Item>

                    <Form.Item label={counterpart.translate("deposit.send_tx_hash.hash_lock")}>
                        {getFieldDecorator("hashLock", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter the hashLock!"
                                },
                                {
                                    //Regexp validation
                                }
                            ]
                        })(<Input onChange={onChangeHashLockHandler} />)}
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit">
                            <Translate content="deposit.send_tx_hash.submit" />
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default connect(Form.create({name: "txHashForm"})(SendTxHash), {
    listenTo() {
        return [AccountStore];
    },
    getProps(props: any) {
        return {
            selectedAccountName: AccountStore.getState().currentAccount
        };
    }
});
