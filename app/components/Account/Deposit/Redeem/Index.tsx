import React, {useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Input, Button} from "bitshares-ui-style-guide";

interface Props {
    form: any;
}

function Index({form}: Props) {
    const {getFieldDecorator} = form;
    const [secret, setSecret] = useState<string>();

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        let errors = false;

        form.validateFieldsAndScroll((error: any, values: any) => {
            if (error) {
                errors = true;
            }
        });

        if (!errors) {
            alert(`Send redeem to Revpop blockchain with secret: ${secret}`);
        }
    }

    const formItemLayout = {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    };

    function onChangeLockChangeHandler(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setSecret(event.currentTarget.value);
    }

    return (
        <>
            <div className="text-center redeem">
                <Translate content="deposit.redeem.title" component="h4" />
            </div>
            <div className="redeem">
                <Form {...formItemLayout} onSubmit={handleSubmit}>
                    <Form.Item
                        label={counterpart.translate("deposit.redeem.secret")}
                    >
                        {getFieldDecorator("secret", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter the secret!"
                                },
                                {
                                    //Regexp validation
                                }
                            ]
                        })(<Input onChange={onChangeLockChangeHandler} />)}
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 12, offset: 4}}>
                        <Button type="primary" htmlType="submit">
                            <Translate content="deposit.redeem.title" />
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

const IndexWrapped = Form.create({name: "redeemForm"})(Index);
export default IndexWrapped;
