import Operation from "./Operation";
import FactoryInterface from "./FactoryInterface";
import {Fees} from "../types";
import BlockchainOperationType = Fees.BlockchainOperationType;
import JsonOperationType = Fees.JsonOperationType;

class Factory implements FactoryInterface {
    create(
        blockchainOperation: BlockchainOperationType,
        jsonOperation: JsonOperationType
    ): Operation {
        const operation = new Operation(jsonOperation.id, jsonOperation.name);
        const blockchainFees = blockchainOperation[1];

        for (const blockchainFee in blockchainFees) {
            operation.addFee(blockchainFee, blockchainFees[blockchainFee]);
        }

        return operation;
    }
}

export default new Factory();
