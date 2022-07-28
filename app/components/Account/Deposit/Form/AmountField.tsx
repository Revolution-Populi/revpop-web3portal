import React from "react";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, InputNumber} from "bitshares-ui-style-guide";

interface Props {
    form: any;
    amount: string;
    onChange: (amount: number) => void;
}

function AmountField({form, amount, onChange}: Props) {
    const {getFieldDecorator} = form;

    function onChangeHandler(amount: number) {
        onChange(amount);
    }

    return (
        <Form.Item label={counterpart.translate("deposit.amount")}>
            {getFieldDecorator("amount", {
                initialValue: amount,
                rules: [
                    {
                        required: true,
                        message: "Please fill deposit amount!"
                    }
                ]
            })(
                <InputNumber
                    min={0}
                    step={0.01}
                    formatter={(value: number) => `${value} ETH`}
                    onChange={onChangeHandler}
                />
            )}
        </Form.Item>
    );
}

export default Form.create({name: "amountField"})(AmountField);
