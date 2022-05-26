import GlobalObjectRepository from "../../../../app/Context/Fees/Infrastructure/GlobalObjectRepository";
import operations from "../Utilities/operations.json";
import {Fees} from "../../../../app/Context/Fees/types";
import JsonOperationsType = Fees.JsonOperationsType;
import BlockchainOperationsType = Fees.BlockchainOperationsType;

export function getGlobalObjectRepository(
    blockchainOperations: BlockchainOperationsType
) {
    return new GlobalObjectRepository(
        blockchainOperations,
        (operations as unknown) as JsonOperationsType
    );
}
