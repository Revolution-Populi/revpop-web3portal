import {Map} from "immutable";
import Operation from "./Domain/Operation";
import Fee from "./Domain/Fee";

export namespace Fees {
    export type BlockchainOperationsType = BlockchainOperationType[];

    export type BlockchainOperationType = [number, BlockchainFeeType];

    export type BlockchainFeeType = {
        [id: string]: number;
    };

    export type JsonOperationType = {
        id: number;
        group: string;
        name: string;
    };

    export type JsonOperationsType = JsonOperationType[];

    export type OperationsType = Map<number, Operation>;

    export type OperationFeesType = Map<string, Fee>;
}
