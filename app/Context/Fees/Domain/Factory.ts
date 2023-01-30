import Operation from "./Operation";
import Fee from "./Fee";
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
            const fee = Fee.create(
                blockchainFee,
                blockchainFees[blockchainFee]
            );

            operation.addFee(fee);
        }

        if (jsonOperation.clearing_house_participant_transfer_fee) {
            operation.setShowCHParticipantTransferFee();
        }

        if (jsonOperation.ltm_required) {
            operation.setLtmRequired();
        }

        return operation;
    }
}

export default new Factory();
