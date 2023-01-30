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
        clearing_house_participant_transfer_fee?: boolean;
        ltm_required?: boolean;
    };

    export type JsonOperationsType = JsonOperationType[];

    export type OperationsType = {
        [id: number]: Operation;
    };

    export type OperationFeesType = Map<string, Fee>;
}
