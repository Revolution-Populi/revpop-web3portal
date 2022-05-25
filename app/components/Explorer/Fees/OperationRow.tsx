import React from "react";

type Operation = {
    id: number;
    name: string;
};

export default function OperationRow(operation: Operation) {
    return (
        <tr key={operation.id}>
            <td>
                <span className="label info">{operation.name}</span>
            </td>
            {/*<OperationTitle name={operation.name} />*/}
            {/*<td>{feeTypes[key]} {opId} {ltm_required.indexOf(opId)}</td>*/}
            {/*<td style={{textAlign: "right"}}>*/}
            {/*    {assetAmount}*/}
            {/*    {amount !== 0 && preferredUnit !== "RVP" ? (*/}
            {/*        <span>*/}
            {/*                                &nbsp;/&nbsp;*/}
            {/*            {equivalentAmount}*/}
            {/*                            </span>*/}
            {/*    ) : null}*/}
            {/*</td>*/}
            {/*<td style={{textAlign: "right"}}>*/}
            {/*    {feeIdx !== 8 ? assetAmountLTM : null}*/}
            {/*    {feeIdx !== 8 &&*/}
            {/*    amount !== 0 &&*/}
            {/*    preferredUnit !== "RVP" ? (*/}
            {/*        <span>*/}
            {/*                                &nbsp;/&nbsp;*/}
            {/*            {equivalentAmountLTM}*/}
            {/*                                </span>*/}
            {/*    ) : null}*/}
            {/*</td>*/}
        </tr>
    );
}
