import React from "react";
// @ts-ignore
import {InputNumber} from "bitshares-ui-style-guide";
import {ParameterValueType} from "../../../../Context/NetworkParameters/Domain/NetworkParameter";

export type ShowTemplateProps = {
    value: Exclude<ParameterValueType, string | boolean>;
    onChange: (value: number) => void;
};

export default function EditNumberTemplate({
    value,
    onChange
}: ShowTemplateProps) {
    function onChangeInput(value: number) {
        onChange(value);
    }

    return (
        <InputNumber min={0} defaultValue={value} onChange={onChangeInput} />
    );
}
