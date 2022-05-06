import NetworkParameter, {
    ParameterValueType
} from "../../../Context/NetworkParameters/Domain/NetworkParameter";
import ParameterActions from "./ParameterActions";
import React, {ReactElement} from "react";
import {ParameterType} from "../../../Context/NetworkParameters/Domain/Factory";
import TableTemplate from "./ParameterValue/TableTemplate";

export interface TableRow {
    key: string;
    name: string;
    description: string | null;
    type: ParameterType | null;
    value?: JSX.Element | ParameterValueType | null;
    newValue?: TableRowValueType | null;
    link?: string | null;
    children?: TableRow[] | null;
    actions: ReactElement | null;
}

export type TableRowValueType = string | number | boolean;

class ParameterToTableRowTransformer {
    constructor(private showEditModal: () => void) {}

    transform(
        parameter: NetworkParameter,
        parent: TableRow | null = null
    ): TableRow {
        const row: TableRow = {
            key:
                null === parent
                    ? parameter.name
                    : [parent.key, parameter.name].join("."),
            name: parameter.name,
            description: parameter.description,
            type: parameter.type,
            value: null,
            newValue: null,
            link: null,
            children: null,
            actions: null
        };

        if (parameter.isLink()) {
            row.link = parameter.link;
            row.actions = (
                <ParameterActions parameter={row} show={this.showEditModal} />
            );
        }

        if (parameter.isGroup()) {
            row.children = parameter.children
                .map(child => this.transform(child as NetworkParameter, row))
                .toArray();
        }

        if (parameter.isNormal()) {
            let value:
                | JSX.Element
                | ParameterValueType = parameter.value as ParameterValueType;

            if (parameter.type && parameter.value != null) {
                value = (
                    <TableTemplate
                        type={parameter.type}
                        value={parameter.value}
                    />
                );
            }

            row.value = value;
            row.newValue = parameter.newValue;
            row.actions = (
                <ParameterActions parameter={row} show={this.showEditModal} />
            );
        }

        return row;
    }
}

export default ParameterToTableRowTransformer;
