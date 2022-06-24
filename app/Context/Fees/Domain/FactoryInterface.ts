import Operation from "./Operation";
import {Fees} from "../types";
import BlockchainOperationType = Fees.BlockchainOperationType;
import JsonOperationType = Fees.JsonOperationType;

export default interface FactoryInterface {
    create: (
        blockchainOperation: BlockchainOperationType,
        jsonOperation: JsonOperationType
    ) => Operation;
}
