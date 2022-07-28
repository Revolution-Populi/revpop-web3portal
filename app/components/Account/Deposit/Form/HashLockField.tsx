import React from "react";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Input} from "bitshares-ui-style-guide";

interface Props {
    form: any;
    hashLock: string;
    onChange: (hashLock: string) => void;
}

function HashLockField({form, hashLock, onChange}: Props) {
    const {getFieldDecorator} = form;

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.currentTarget.value);
    }

    return (
        <Form.Item label={counterpart.translate("deposit.hash")}>
            {getFieldDecorator("hashLock", {
                initialValue: hashLock,
                rules: [
                    {
                        required: true,
                        message: "Please input your HashLock!"
                    },
                    {
                        pattern: /0x[a-z\d]{64}/,
                        message:
                            "HashLock should be 64 characters long with 0x prefix"
                    }
                ]
            })(<Input onChange={onChangeHandler} />)}
        </Form.Item>
    );
}

export default Form.create({name: "hashLockField"})(HashLockField);
