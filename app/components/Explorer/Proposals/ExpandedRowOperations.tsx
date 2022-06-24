import React from "react";
import {Set} from "immutable";
import counterpart from "counterpart";
import OperationView from "./ViewModal/Operation";
import FormattedAsset from "../../Utility/FormattedAsset";

interface Props {
    operations: Set<OperationView>;
}

export default function ExpandedRowOperations({operations}: Props) {
    const viewOperations = operations.map(operation => {
        operation = operation as OperationView;

        if (!operation.changed) {
            return null;
        }

        const viewFees = operation.fees.map(fee => {
            if (!fee.changed) {
                return null;
            }

            return (
                <li key={fee.code}>
                    {counterpart.translate(`transaction.feeTypes.${fee.code}`, {
                        fallback: fee.code
                    })}
                    :
                    <span className="new-value">
                        <FormattedAsset amount={fee.networkValue} asset="1.3.0" />
                    </span>
                    <span className="old-value">
                        (<FormattedAsset amount={fee.value} asset="1.3.0" />)
                    </span>
                </li>
            );
        });

        let name = counterpart.translate(`transaction.trxTypes.${operation.name}`, {
            fallback: operation.name
        });
        name = name.charAt(0).toUpperCase() + name.slice(1);

        return (
            <li key={operation.id}>
                {name}:<ul>{viewFees}</ul>
            </li>
        );
    });

    return <ul className="operations-list">{viewOperations}</ul>;
}
