import GlobalObjectRepository from "../../../../app/Context/Fees/Infrastructure/GlobalObjectRepository";
import operations from "../../../../app/Context/Fees/Domain/operations.json";
import {Fees} from "../../../../app/Context/Fees/types";
import JsonOperationsType = Fees.JsonOperationsType;
import BlockchainOperationsType = Fees.BlockchainOperationsType;

export function getGlobalObjectRepository() {
    return new GlobalObjectRepository(
        blockchainOperations,
        (operations as unknown) as JsonOperationsType
    );
}

const blockchainOperations: BlockchainOperationsType = [
    [0, {fee: 86869, price_per_kbyte: 48260}],
    [1, {basic_fee: 482609, premium_fee: 24130471, price_per_kbyte: 48260}]
];
