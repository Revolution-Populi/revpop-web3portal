import {Map} from "immutable";
import RepositoryInterface from "../Domain/RepositoryInterface";
import Operation from "../Domain/Operation";
import Factory from "../Domain/Factory";
import {Fees} from "../types";
import BlockchainOperationsType = Fees.BlockchainOperationsType;
import JsonOperationsType = Fees.JsonOperationsType;
import Operations = Fees.OperationsType;

export default class GlobalObjectRepository implements RepositoryInterface {
    constructor(
        private blockchainOperations: BlockchainOperationsType,
        private jsonOperations: JsonOperationsType
    ) {}

    async loadAll(): Promise<Operations> {
        const operations: Operations = Map<number, Operation>().asMutable();

        for (const blockchainOperation of this.blockchainOperations) {
            const jsonOperation = this.jsonOperations.find(
                jsonOperation => jsonOperation.id == blockchainOperation[0]
            );

            if (jsonOperation) {
                const operation = Factory.create(
                    blockchainOperation,
                    jsonOperation
                );

                operations.set(operation.id, operation);
            }
        }

        return operations;
    }
}
