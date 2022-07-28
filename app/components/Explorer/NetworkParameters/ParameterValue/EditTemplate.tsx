import React, {ReactElement} from "react";
import {TableRowValueType} from "../ParameterToTableRowTransformer";
import {ParameterType} from "../../../../Context/NetworkParameters/Domain/Factory";
import EditNumberTemplate from "./EditNumberTemplate";
import EditBooleanTemplate from "./EditBooleanTemplate";
import EditStringTemplate from "./EditStringTemplate";

export type EditTemplateProps = {
    type: ParameterType;
    value: TableRowValueType;
    onChange: () => void;
};

export default function EditTemplate({
    type,
    value,
    onChange
}: EditTemplateProps) {
    let element: ReactElement;

    //TODO:resolve type by value

    switch (type) {
        case "uint8_t":
        case "uint16_t":
        case "uint32_t":
        case "int64_t":
            element = (
                <EditNumberTemplate
                    value={value as number}
                    onChange={onChange}
                />
            );
            break;
        case "bool":
            element = (
                <EditBooleanTemplate
                    value={value as boolean}
                    onChange={onChange}
                />
            );
            break;
        default:
            element = (
                <EditStringTemplate
                    value={value as string}
                    onChange={onChange}
                />
            );
            break;
    }

    return <>{element}</>;
}
