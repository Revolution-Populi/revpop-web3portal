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
                <td rowSpan={operation.fees.size}>
                    <span className="label info">{operation.name}</span>
                </td>
            )}
            <td>{fee.name}</td>
            <td className="standard-fee">
                <FeeValueWithEdit value={fee.standardFee} />
            </td>
            <td className="lifetime-member-fee">
                <FeeValue value={fee.lifetimeMemberFee} />
            </td>
        </tr>
    );
}
