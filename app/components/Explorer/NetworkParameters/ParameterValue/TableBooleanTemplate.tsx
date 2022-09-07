import React from "react";
import {ParameterValueType} from "../../../../Context/NetworkParameters/Domain/NetworkParameter";
import TableStringTemplate from "./TableStringTemplate";

export type ShowTemplateProps = {
    value: Extract<ParameterValueType, boolean>;
};

export default function TableBooleanTemplate({value}: ShowTemplateProps) {
    const showValue = value ? "true" : "false";

    return <TableStringTemplate value={showValue} />;
}
