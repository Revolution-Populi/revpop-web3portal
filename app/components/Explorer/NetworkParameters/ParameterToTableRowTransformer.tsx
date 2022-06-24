import NetworkParameter, {ParameterValueType} from "../../../Context/NetworkParameters/Domain/NetworkParameter";
import ParameterActions from "./ParameterActions";
import React, {ReactElement} from "react";
import TableTemplate from "./ParameterValue/TableTemplate";
import {NetworkParameters} from "../../../Context/NetworkParameters/types";
import ParameterType = NetworkParameters.ParameterType;

export interface TableRow {
    key: string;
    name: string;
    description: string | null;
    type: ParameterType | null;
    rawValue?: ParameterValueType | null;
    value?: JSX.Element | ParameterValueType | null;
    rawNewValue?: ParameterValueType | null;
    newValue?: JSX.Element | TableRowValueType | null;
    link?: string | null;
    children?: TableRow[] | null;
    actions: ReactElement | null;
}

export type TableRowValueType = string | number | boolean;

class ParameterToTableRowTransformer {
    constructor(private showEditModal: () => void) {}

    transform(parameter: NetworkParameter, parent: TableRow | null = null): TableRow {
        const row: TableRow = {
            key: null === parent ? parameter.name : [parent.key, parameter.name].join("."),
            name: parameter.name,
            description: parameter.description,
            type: parameter.type,
            rawValue: null,
            value: null,
            rawNewValue: null,
            newValue: null,
            link: null,
            children: null,
            actions: null
        };

        if (parameter.isLink()) {
            row.link = parameter.link;
            row.actions = <ParameterActions parameter={row} show={this.showEditModal} />;
        }

        if (parameter.isGroup()) {
            row.children = parameter.children.map(child => this.transform(child as NetworkParameter, row)).toArray();
        }

        if (parameter.isNormal()) {
            row.rawValue = parameter.value;
            row.value = <TableTemplate type={parameter.type} value={parameter.value} />;
            row.rawNewValue = parameter.newValue ?? parameter.value;
            row.newValue = <TableTemplate type={parameter.type} value={parameter.newValue} />;
            row.actions = <ParameterActions parameter={row} show={this.showEditModal} />;
        }

        return row;
    }
}

export default ParameterToTableRowTransformer;
