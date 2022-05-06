import React from "react";
import {ParameterValueType} from "../../../../Context/NetworkParameters/Domain/NetworkParameter";

export type ShowTemplateProps = {
    value: Exclude<ParameterValueType, boolean>;
};

export default function TableStringTemplate({value}: ShowTemplateProps) {
    return <>{value}</>;
}
