import blockchainRepository from "./Infrastructure/BlockchainRepository";
import jsonParameters from "./Domain/parameters.json";
import {JsonParametersType} from "./Domain/Factory";
import LoadAll from "./Application/Query/LoadAll/LoadAll";
import LoadAllHandler from "./Application/Query/LoadAll/LoadAllHandler";
import CreateProposal from "./Application/Commands/CreateProposal/CreateProposal";
import CreateProposalHandler from "./Application/Commands/CreateProposal/CreateProposalHandler";

const loadAllHandler = new LoadAllHandler(blockchainRepository, jsonParameters as JsonParametersType);
const createProposalHandler = new CreateProposalHandler();

export {LoadAll, loadAllHandler};
export {CreateProposal, createProposalHandler};
