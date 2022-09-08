import React, {ReactElement} from "react";
import {TableRowValueType} from "../ParameterToTableRowTransformer";
import TableStringTemplate from "./TableStringTemplate";
import TableBooleanTemplate from "./TableBooleanTemplate";
import {NetworkParameters} from "../../../../Context/NetworkParameters/types";
import ParameterType = NetworkParameters.ParameterType;

export type ShowTemplateProps = {
    type: ParameterType | null;
    value: TableRowValueType | null;
};

export default function TableTemplate({type, value}: ShowTemplateProps) {
    if (null === value) {
        return null;
    }

    let element: ReactElement;

    switch (type) {
        case "uint8_t":
        case "uint16_t":
        case "uint32_t":
        case "int64_t":
            element = <TableStringTemplate value={value as number} />;
            break;
        case "bool":
            element = <TableBooleanTemplate value={value as boolean} />;
            break;
        default:
            element = <TableStringTemplate value={value as number} />;
            break;
    }

    return <>{element}</>;
}
