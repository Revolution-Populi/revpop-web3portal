import Operation from "../../../../app/Context/Fees/Domain/Operation";
import {Fees} from "../../../../app/Context/Fees/types";
import BlockchainFeeType = Fees.BlockchainFeeType;
import BlockchainOperationType = Fees.BlockchainOperationType;

export function getOperation(
    id: number,
    name: string,
    fees: BlockchainFeeType = {}
) {
    const operation = new Operation(id, name);

    for (const fee in fees) {
        operation.addFee(fee, fees[fee]);
    }

    return operation;
}

export function getBlockchainOperation(
    id: number,
    fees: BlockchainFeeType = {}
): BlockchainOperationType {
    return [id, fees];
}
