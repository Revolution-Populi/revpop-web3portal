import React from "react";
import {ParameterValueType} from "../../../../Context/NetworkParameters/Domain/NetworkParameter";

export type ShowTemplateProps = {
    value: Extract<ParameterValueType, boolean>;
};

export default function TableBooleanTemplate({value}: ShowTemplateProps) {
    const showValue = value ? "true" : "false";

    return <>{showValue}</>;
}
