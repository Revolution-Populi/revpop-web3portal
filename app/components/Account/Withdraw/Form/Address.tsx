import React from "react";
// @ts-ignore
import {Form, Input, Tooltip, Icon} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import Web3 from "web3";

interface Props {
    form: any;
    value: string;
    onChange: (hashLock: string) => void;
}

export default function Address({form, value, onChange}: Props) {
    const {getFieldDecorator} = form;
    const label = (
        <>
            {counterpart.translate("form.address.label")}
            <Tooltip title={counterpart.translate("form.address.tooltip")}>
                <Icon type="question-circle" />
            </Tooltip>
        </>
    );

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.currentTarget.value);
    }

    return (
        <Form.Item label={label}>
            {getFieldDecorator("value", {
                initialValue: value,
                rules: [
                    {
                        required: true,
                        message:
                            "Please input your Address of User in Ethereum!"
                    },
                    {
                        pattern: /^0x[a-fA-F0-9]{40}$/,
                        message: "Invalid ethereum address"
                    }
                ]
            })(<Input onChange={onChangeHandler} />)}
        </Form.Item>
    );
}
