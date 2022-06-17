import LoadAllHandler from "./Application/Query/LoadAll/LoadAllHandler";
import BlockchainRepository from "./Infrastructure/BlockchainRepository";
import jsonOperations from "./Domain/operations.json";
import LoadAll from "./Application/Query/LoadAll/LoadAll";
import GetChanged from "./Application/Query/GetChanged/GetChanged";
import {Fees} from "./types";
import JsonOperationsType = Fees.JsonOperationsType;
import GetChangedHandler from "./Application/Query/GetChanged/GetChangedHandler";

const blockchainRepository = new BlockchainRepository(
    jsonOperations as JsonOperationsType
);

const loadAllHandler = new LoadAllHandler(blockchainRepository);
export {LoadAll, loadAllHandler};

const getChangedHandler = new GetChangedHandler();
export {GetChanged, getChangedHandler};
