import React from "react";
import OperationViewModel from "../ViewModel/Operation";
import FeeViewModel from "../ViewModel/Fee";
import Fee from "./Fee";
import FeeCH from "./FeeCH";

type OperationProps = {
    operation: OperationViewModel;
};

export default function Operation({operation}: OperationProps) {
    let feeNumber = 0;

    return (
        <>
            {operation.fees.map(fee => {
                const key = `${operation.id}_${(fee as FeeViewModel).name}`;
                feeNumber++;

                return (
                    <Fee
                        feeNumber={feeNumber}
                        key={key}
                        operation={operation}
                        fee={fee as FeeViewModel}
                    />
                );
            })}

            {operation.showCHParticipantTransferFee && <FeeCH />}
        </>
    );
}
