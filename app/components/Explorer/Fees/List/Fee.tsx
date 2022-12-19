import React from "react";
import OperationViewModel from "../ViewModel/Operation";
import FeeViewModel from "../ViewModel/Fee";
import FeeValueWithEdit from "./FeeValueWithEdit";
import FeeValue from "./FeeValue";

export type FeeProps = {
    feeNumber: number;
    operation: OperationViewModel;
    fee: FeeViewModel;
};

export default function Fee({feeNumber, operation, fee}: FeeProps) {
    return (
        <tr>
            {feeNumber == 1 && (
                <td rowSpan={operation.rowSpan}>
                    <span className="label info">{operation.name}</span>
                </td>
            )}
            <td>{fee.name}</td>
            <td className="standard-fee">
                {operation.ltmRequired && (
                    <>
                        - <sup>*</sup>
                    </>
                )}
                {!operation.ltmRequired && (
                    <FeeValueWithEdit
                        fee={fee}
                        operationId={operation.id}
                        code={fee.code}
                    />
                )}
            </td>
            <td className="lifetime-member-fee">
                <FeeValue
                    value={fee.lifetimeMemberFee}
                    newValue={fee.lifetimeMemberFeeNewValue}
                    updated={fee.updated()}
                />
            </td>
        </tr>
    );
}
