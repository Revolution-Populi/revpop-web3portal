import {Map} from "immutable";
import RepositoryInterface from "../Domain/RepositoryInterface";
import Operation from "../Domain/Operation";
import Factory from "../Domain/Factory";
import {Fees} from "../types";
import BlockchainOperationsType = Fees.BlockchainOperationsType;
import JsonOperationsType = Fees.JsonOperationsType;
import Operations = Fees.Operations;

export default class GlobalObjectRepository implements RepositoryInterface {
    constructor(
        private blockchainOperations: BlockchainOperationsType,
        private jsonOperations: JsonOperationsType
    ) {}

    loadAll(): Operations {
        const operations: Operations = Map<number, Operation>().asMutable();

        for (const key in this.jsonOperations) {
            const jsonOperation = this.jsonOperations[key];
            const blockchainOperation = this.blockchainOperations.find(
                operation => operation[0] === jsonOperation.id
            );

            if (!blockchainOperation) {
                continue;
            }

            const operation = Factory.create(
                blockchainOperation,
                jsonOperation
            );

            operations.set(operation.id, operation);
        }

        // let fees = opIds.map(opID => {
        //     let feeIdx = feesRaw.findIndex(f => f[0] === opID);
        //     if (feeIdx === -1) {
        //         console.warn(
        //             "Asking for non-existing fee id %d! Check group settings in Fees.jsx",
        //             opID
        //         );
        //         return; // FIXME, if I ask for a fee that does not exist?
        //     }
        //
        //     let feeStruct = feesRaw[feeIdx];
        //
        //     let opId = feeStruct[0];
        //     let fee = feeStruct[1];
        //     let operation_name = ops[opId];
        //     let feeName = trxTypes[operation_name];
        //
        //     let feeRateForLTM = network_fee;
        //     if (opId === 10) {
        //         // See https://github.com/bitshares/bitshares-ui/issues/996
        //         feeRateForLTM = 0.5 + 0.5 * network_fee;
        //     }
        //
        //     let rows = [];
        //     let headIncluded = false;
        //     let labelClass = classNames("label", "info");
        // })

        return operations;
    }
}

// const feeGrouping = {
//     general: [
//         0,
//         25,
//         26,
//         27,
//         28,
//         32,
//         33,
//         37,
//         39,
//         41,
//         49,
//         50,
//         52,
//         69,
//         70,
//         71,
//         72,
//         73
//     ],
//     asset: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 38, 43, 44, 47, 48],
//     market: [1, 2, 3, 4, 45, 46],
//     account: [5, 6, 7, 8, 9],
//     business: [20, 21, 22, 23, 24, 29, 30, 31, 34, 35, 36],
// }
//
// const ltmRequired = [5, 7, 20, 21, 34];
