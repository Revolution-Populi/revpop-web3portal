import React, {useEffect, useState} from "react";
import crypto from "crypto";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Input, Button, Tooltip, Icon} from "bitshares-ui-style-guide";

interface Props {
    form: any;
    hashLock: string;
    onChange: (hasLock: string) => void;
}

export default function Manually({form, hashLock, onChange}: Props) {
    const {getFieldDecorator} = form;

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.currentTarget.value);
    }

    const label = (
        <>
            {counterpart.translate("deposit.form.hash_lock.label")}
            <Tooltip
                title={counterpart.translate("deposit.form.hash_lock.tooltip")}
            >
                <Icon type="question-circle" />
            </Tooltip>
        </>
    );

    return (
        <Form.Item label={label}>
            {getFieldDecorator("hashLock", {
                initialValue: hashLock,
                rules: [
                    {
                        required: true,
                        message: "Please input your HashLock!"
                    },
                    {
                        pattern: /[a-fA-F\d]{64}/,
                        message:
                            "HashLock should be 64 characters long. Use only hexadecimal symbols."
                    }
                ]
            })(<Input onChange={onChangeHandler} />)}
        </Form.Item>
    );
}
