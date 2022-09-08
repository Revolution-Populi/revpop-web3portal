import React from "react";
import {Set} from "immutable";
import counterpart from "counterpart";
import ParameterView from "./ViewModal/Parameter";

interface Props {
    parameters: Set<ParameterView>;
}

export default function ExpandedRowParameters({parameters}: Props) {
    const viewParameters = parameters.map(parameter => {
        parameter = parameter as ParameterView;

        if (!parameter.changed && !parameter.new) {
            return null;
        }
        console.log(parameter);

        if (parameter.changed) {
            return (
                <li key={parameter.code}>
                    {parameter.code}:<span className="new-value">{parameter.value}</span>
                    <span className="old-value">({parameter.networkValue})</span>
                </li>
            );
        }

        return (
            <li key={parameter.code}>
                {parameter.code}:<span className="new-value">{parameter.value}</span>
                <span className="new">{counterpart.translate("network_parameters.proposals.parameters.new")}</span>
            </li>
        );
    });

    return <ul className="parameters-list">{viewParameters}</ul>;
}
