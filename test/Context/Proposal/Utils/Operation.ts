import Operation from "../../../../app/Context/Proposal/Domain/Operation";
import Fee from "../../../../app/Context/Proposal/Domain/Fee";
import {ProposalTypes} from "../../../../app/Context/Proposal/types";
import BlockchainCurrentFeesOperationFeeType = ProposalTypes.BlockchainCurrentFeesOperationFeeType;

export function getOperation(id: number, fees: BlockchainCurrentFeesOperationFeeType): Operation {
    const operationFees = [];
    for (const feeCode in fees) {
        operationFees.push(Fee.create(feeCode, fees[feeCode]));
    }

    return Operation.create(id, operationFees);
}
