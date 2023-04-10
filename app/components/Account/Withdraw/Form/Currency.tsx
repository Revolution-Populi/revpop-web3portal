import React from "react";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Tooltip, Icon} from "bitshares-ui-style-guide";
import AssetSelect from "../../../Utility/AssetSelect";

interface Props {
    form: any;
    currency: string;
    defaultAssets: string[];
    onChange: (currency: string) => void;
    label: string;
    tooltip: string;
    requiredMessage: string;
    name: string;
}

export default function Currency({
    form,
    currency,
    defaultAssets,
    onChange,
    label,
    tooltip,
    requiredMessage,
    name
}: Props) {
    const {getFieldDecorator} = form;

    function onChangeHandler(currency: string) {
        onChange(currency);
    }

    const itemLabel = (
        <>
            {counterpart.translate(label)}
            <Tooltip title={counterpart.translate(tooltip)}>
                <Icon type="question-circle" />
            </Tooltip>
        </>
    );

    return (
        <Form.Item label={itemLabel}>
            {getFieldDecorator(name, {
                initialValue: currency,
                rules: [
                    {
                        required: true,
                        message: counterpart.translate(requiredMessage)
                    }
                ]
            })(
                <AssetSelect
                    value={currency}
                    assets={defaultAssets}
                    onChange={onChangeHandler}
                />
            )}
        </Form.Item>
    );
}
