// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";
import RepositoryInterface from "../Domain/RepositoryInterface";
import Factory from "../Domain/Factory";
import {Fees} from "../types";
import JsonOperationsType = Fees.JsonOperationsType;
import Operations = Fees.OperationsType;

export default class BlockchainRepository implements RepositoryInterface {
    constructor(private jsonOperations: JsonOperationsType) {}

    async loadAll(): Promise<[Operations, number, number]> {
        const data = (
            await Apis.instance()
                .db_api()
                .exec("get_global_properties", [])
        ).parameters;

        const blockchainOperations = data.current_fees.parameters;
        const scale = data.current_fees.scale;
        const networkPercentOfFee = data.network_percent_of_fee;

        const operations: Operations = {};

        for (const blockchainOperation of blockchainOperations) {
            const jsonOperation = this.jsonOperations.find(
                jsonOperation => jsonOperation.id == blockchainOperation[0]
            );

            if (jsonOperation) {
                const operation = Factory.create(
                    blockchainOperation,
                    jsonOperation
                );

                operations[operation.id] = operation;
            }
        }

        return [operations, scale, networkPercentOfFee];
    }
}
