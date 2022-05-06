import React, {ReactElement} from "react";
import {TableRowValueType} from "../ParameterToTableRowTransformer";
import {ParameterType} from "../../../../Context/NetworkParameters/Domain/Factory";
import TableStringTemplate from "./TableStringTemplate";
import TableBooleanTemplate from "./TableBooleanTemplate";

export type ShowTemplateProps = {
    type: ParameterType;
    value: TableRowValueType;
};

export default function TableTemplate({type, value}: ShowTemplateProps) {
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
