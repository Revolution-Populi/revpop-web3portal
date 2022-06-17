import sinon from "sinon";
// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";
import BlockchainRepository from "../../../../app/Context/Fees/Infrastructure/BlockchainRepository";
import operations from "../Utilities/operations.json";
import {Fees} from "../../../../app/Context/Fees/types";
import JsonOperationsType = Fees.JsonOperationsType;
import BlockchainOperationsType = Fees.BlockchainOperationsType;

export function getBlockchainRepository(
    blockchainOperations: BlockchainOperationsType
) {
    sinon.restore();

    const execFake = sinon.fake.returns({
        parameters: {
            network_percent_of_fee: 2000,
            current_fees: {
                parameters: blockchainOperations,
                scale: 10000
            }
        }
    });
    const dbApiFake = sinon.fake.returns({
        exec: execFake
    });
    const instanceFake = sinon.fake.returns({
        db_api: dbApiFake
    });
    sinon.replace(Apis, "instance", instanceFake);

    return new BlockchainRepository(
        (operations as unknown) as JsonOperationsType
    );
}
