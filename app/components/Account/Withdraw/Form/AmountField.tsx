import React from "react";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, InputNumber, Tooltip, Icon} from "bitshares-ui-style-guide";
import {ValidationRule} from "antd/lib/form/Form";

interface Props {
    form: any;
    amount: number;
    minAmount: number;
    onChange: (amount: number) => void;
    validateCallback?: (value: number) => void;
}

export default function AmountField({
    form,
    amount,
    minAmount,
    onChange,
    validateCallback
}: Props) {
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

    const rules: ValidationRule[] = [
        {
            required: true,
            message: "Please fill deposit amount!"
        }
    ];

    if (validateCallback) {
        rules.push({
            validator: validateCallback
        });
    }

    return (
        <Form.Item label={label}>
            {getFieldDecorator("amount", {
                initialValue: amount,
                rules: rules
            })(
                <InputNumber
                    min={minAmount}
                    step={0.01}
                    formatter={(value: number) => `${value} ETH`}
                    onChange={onChangeHandler}
                />
            )}
        </Form.Item>
    );
}
