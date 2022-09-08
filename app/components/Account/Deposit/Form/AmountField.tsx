import React from "react";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, InputNumber, Tooltip, Icon} from "bitshares-ui-style-guide";

interface Props {
    form: any;
    amount: number;
    onChange: (amount: number) => void;
}

export default function AmountField({form, amount, onChange}: Props) {
    const {getFieldDecorator} = form;

    function onChangeHandler(amount: number) {
        onChange(amount);
    }

    const label = (
        <>
            {counterpart.translate("deposit.form.amount.label")}
            <Tooltip
                title={counterpart.translate("deposit.form.amount.tooltip")}
            >
                <Icon type="question-circle" />
            </Tooltip>
        </>
    );

    return (
        <Form.Item label={label}>
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
