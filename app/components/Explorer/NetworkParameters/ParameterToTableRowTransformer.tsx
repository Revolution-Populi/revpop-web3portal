import NetworkParameter from "../../../Context/NetworkParameters/Domain/NetworkParameter";
import ParameterActions from "./ParameterActions";
import React, {ReactElement} from "react";

export interface TableRow {
    key: string;
    name: string;
    value?: TableRowValueType | null;
    newValue?: TableRowValueType | null;
    link?: string | null;
    children?: TableRow[] | null;
    actions: ReactElement | null;
}

type TableRowValueType = string | number | boolean;

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
            value: null,
            newValue: null,
            link: null,
            children: null,
            actions: null
        };

        if (parameter.isLink()) {
            row.link = parameter.link;
        }

        if (parameter.isGroup()) {
            row.children = parameter.children
                .map(child => this.transform(child as NetworkParameter, row))
                .toArray();
        }

        if (parameter.isNormal()) {
            row.value = parameter.value;
            row.newValue = parameter.newValue;
            row.actions = (
                <ParameterActions parameter={row} show={this.showEditModal} />
            );
        }

        return row;
    }
}

export default ParameterToTableRowTransformer;
