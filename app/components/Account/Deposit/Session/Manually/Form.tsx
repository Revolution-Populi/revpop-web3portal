import React, {useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Input, Button} from "bitshares-ui-style-guide";
import {
    AddTransactionManually,
    addTransactionManuallyHandler,
    Session
} from "../../../../../Context/EES";

interface Props {
    session: Session;
    form: any;
}

function ConfirmTransactionForm({session, form}: Props) {
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
        const result = addTransactionManuallyHandler.execute(command);

        console.log(result);
    }

    const formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    };

    function onChangeTxHash(event: React.ChangeEvent<HTMLInputElement>) {
        setTxHash(event.currentTarget.value);
    }

    return (
        <>
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
                                message: "Please enter the transaction hash!"
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
        </>
    );
}

export default Form.create({name: "confirmTransactionForm"})(
    ConfirmTransactionForm
);
