import blockchainRepository from "./Infrastructure/BlockchainRepository";
import LoadAll from "./Application/Query/LoadAll/LoadAll";
import LoadAllHandler from "./Application/Query/LoadAll/LoadAllHandler";
import jsonParameters from "./Domain/parameters.json";
import {JsonParametersType} from "./Domain/Factory";

const loadAllHandler = new LoadAllHandler(
    blockchainRepository,
    jsonParameters as JsonParametersType
);

export {LoadAll, loadAllHandler};
