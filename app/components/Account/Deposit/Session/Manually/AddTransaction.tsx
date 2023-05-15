import React, {useState} from "react";
import counterpart from "counterpart";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import {Form, Input, Button, Collapse} from "bitshares-ui-style-guide";
import {
    AddTransactionManually,
    addTransactionManuallyHandler,
    Session
} from "../../../../../Context/EES";

interface Params {
    session: Session;
    refresh: () => void;
    form: any;
}

const {Panel} = Collapse;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
};

function AddTransaction({session, refresh, form}: Params) {
    const {getFieldDecorator} = form;
    const [txHash, setTxHash] = useState<string>();

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

        const command = new AddTransactionManually(
            session.id,
            txHash as string
        );

        try {
            await addTransactionManuallyHandler.execute(command);
            refresh();
        } catch (e) {
            form.setFields({
                tx_hash: {
                    value: txHash,
                    errors: [new Error((e as Error).message)]
                }
            });
        }
    }

    function onChangeTxHash(event: React.ChangeEvent<HTMLInputElement>) {
        setTxHash(event.currentTarget.value);
    }

    return (
        <div className="add-txhash-manually">
            <Collapse bordered={false}>
                <Panel
                    header={counterpart(
                        "deposit.manually.add_transaction.label"
                    )}
                    key="1"
                >
                    <Form {...formItemLayout} onSubmit={handleSubmit}>
                        <Form.Item
                            label={counterpart.translate(
                                "deposit.manually.add_transaction.tx_hash"
                            )}
                        >
                            {getFieldDecorator("tx_hash", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please enter the transaction hash!"
                                    },
                                    {
                                        //Regexp validation
                                    }
                                ]
                            })(<Input onChange={onChangeTxHash} />)}
                        </Form.Item>

                        <Form.Item wrapperCol={{span: 12, offset: 6}}>
                            <Button type="primary" htmlType="submit">
                                <Translate content="deposit.manually.add_transaction.submit" />
                            </Button>
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
        </div>
    );
}

export default Form.create({name: "addTransaction"})(AddTransaction);
