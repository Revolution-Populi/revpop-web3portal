import React from "react";
// @ts-ignore
import counterpart from "counterpart";
import Proposal from "../../../../Context/Proposal/Domain/Proposal";
import Parameter from "../../../../Context/Proposal/Domain/Parameter";

interface props {
    proposal: Proposal;
}

export default function ExpandedRow({proposal}: props) {
    const parameters = proposal.parameters.map(parameter => {
        parameter = parameter as Parameter;

        if (!parameter.changed && !parameter.new) {
            return null;
        }

        if (parameter.changed) {
            return (
                <li key={parameter.name}>
                    {parameter.name}:
                    <span className="new-value">{parameter.value}</span>
                    <span className="old-value">
                        ({parameter.networkValue})
                    </span>
                </li>
            );
        }

        return (
            <li key={parameter.name}>
                {parameter.name}:
                <span className="new-value">{parameter.value}</span>
                <span className="new">
                    {counterpart.translate(
                        "network_parameters.proposals.parameters.new"
                    )}
                </span>
            </li>
        );
    });

    return <ul className="parameters-list">{parameters}</ul>;
}
