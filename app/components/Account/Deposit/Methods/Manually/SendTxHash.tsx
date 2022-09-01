import React, {useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Input, Button} from "bitshares-ui-style-guide";
import {
    SendTxHash as SendTxHashCommand,
    sendTxHashHandler
} from "../../../../../Context/Deposit";

interface Props {
    form: any;
}

function SendTxHash({form}: Props) {
    const {getFieldDecorator} = form;
    const [txHash, setTxHash] = useState<string>();

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

        const command = new SendTxHashCommand(txHash as string);
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

    function onChangeLockChangeHandler(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setTxHash(event.currentTarget.value);
    }

    return (
        <>
            <div className="text-center redeem">
                <Translate
                    content="deposit.send_tx_hash.title"
                    component="h4"
                />
            </div>
            <div className="redeem">
                <Form {...formItemLayout} onSubmit={handleSubmit}>
                    <Form.Item
                        label={counterpart.translate(
                            "deposit.send_tx_hash.tx_hash"
                        )}
                    >
                        {getFieldDecorator("secret", {
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
                        })(<Input onChange={onChangeLockChangeHandler} />)}
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

const SendTxHashWrapped = Form.create({name: "txHashForm"})(SendTxHash);
export default SendTxHashWrapped;
