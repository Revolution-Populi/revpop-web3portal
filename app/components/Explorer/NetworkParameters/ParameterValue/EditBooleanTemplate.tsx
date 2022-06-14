import React from "react";
// @ts-ignore
import {Select} from "bitshares-ui-style-guide";
import {ParameterValueType} from "../../../../Context/NetworkParameters/Domain/NetworkParameter";

export type ShowTemplateProps = {
    value: Exclude<ParameterValueType, string | number>;
    onChange: (value: boolean) => void;
};

export default function EditBooleanTemplate({
    value,
    onChange
}: ShowTemplateProps) {
    function onChangeSelect(value: number) {
        onChange(value == 1);
    }

    return (
        <Select
            defaultValue={+value}
            style={{width: 120}}
            onChange={onChangeSelect}
        >
            <Select.Option value={1}>True</Select.Option>
            <Select.Option value={0}>False</Select.Option>
        </Select>
    );
}
