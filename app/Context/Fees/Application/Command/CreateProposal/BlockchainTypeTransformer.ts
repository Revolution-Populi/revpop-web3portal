import {Fees} from "../../../types";
import OperationsType = Fees.OperationsType;
import BlockchainOperationsType = Fees.BlockchainOperationsType;
import BlockchainOperationType = Fees.BlockchainOperationType;
import BlockchainFeeType = Fees.BlockchainFeeType;
import Fee from "../../../Domain/Fee";

export default class BlockchainTypeTransformer {
    transform(operations: OperationsType): BlockchainOperationsType {
        const blockchainOperations: BlockchainOperationsType = [];

        for (const operationId in operations) {
            const operation = operations[operationId];
            const blockchainFees: BlockchainFeeType = {};

            operation.fees.forEach(fee => {
                fee = fee as Fee;

                blockchainFees[fee.code] = fee.updated ? (fee.newValue as number) : fee.value;
            });

            const blockchainOperation: BlockchainOperationType = [operation.id, blockchainFees];

            blockchainOperations.push(blockchainOperation);
        }

        return blockchainOperations;
    }
}
