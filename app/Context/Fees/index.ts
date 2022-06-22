import BlockchainRepository from "./Infrastructure/BlockchainRepository";
import jsonOperations from "./Domain/operations.json";
import LoadAll from "./Application/Query/LoadAll/LoadAll";
import LoadAllHandler from "./Application/Query/LoadAll/LoadAllHandler";
import GetChanged from "./Application/Query/GetChanged/GetChanged";
import GetChangedHandler from "./Application/Query/GetChanged/GetChangedHandler";
import CreateProposal from "./Application/Command/CreateProposal/CreateProposal";
import CreateProposalHandler from "./Application/Command/CreateProposal/CreateProposalHandler";
import {Fees} from "./types";
import JsonOperationsType = Fees.JsonOperationsType;
import BlockchainTypeTransformer from "./Application/Command/CreateProposal/BlockchainTypeTransformer";

const blockchainRepository = new BlockchainRepository(jsonOperations as JsonOperationsType);

const loadAllHandler = new LoadAllHandler(blockchainRepository);
export {LoadAll, loadAllHandler};

const getChangedHandler = new GetChangedHandler();
export {GetChanged, getChangedHandler};

const blockchainTypeTransformer = new BlockchainTypeTransformer();
const createProposalHandler = new CreateProposalHandler(blockchainTypeTransformer);
export {CreateProposal, createProposalHandler};
