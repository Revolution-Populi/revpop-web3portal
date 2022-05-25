import {Map} from "immutable";

export namespace Fees {
    // export type CurrentFeesType = {
    //     parameters: BlockchainOperationsType,
    //     scale: number
    // }

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

    export type Operations = Map<number, Operation>;
}
