import React, {ChangeEvent} from "react";
// @ts-ignore
import {Input} from "bitshares-ui-style-guide";
import {ParameterValueType} from "../../../../Context/NetworkParameters/Domain/NetworkParameter";

export type ShowTemplateProps = {
    value: Exclude<ParameterValueType, number | boolean>;
    onChange: (value: string) => void;
};

export default function EditStringTemplate({
    value,
    onChange
}: ShowTemplateProps) {
    function onChangeInput(event: ChangeEvent<Input>) {
        onChange(event.target.value);
    }

    return <Input defaulvalue={value} onChange={onChangeInput} />;
}
