import {Fees} from "../../../../app/Context/Fees/types";
import BlockchainFeeType = Fees.BlockchainFeeType;
import BlockchainOperationType = Fees.BlockchainOperationType;

export function getBlockchainOperation(
    id: number,
    fees: BlockchainFeeType = {}
): BlockchainOperationType {
    return [id, fees];
}
