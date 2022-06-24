import blockchainRepository from "./Infrastructure/BlockchainRepository";
import jsonParameters from "./Domain/parameters.json";
import LoadAll from "./Application/Query/LoadAll/LoadAll";
import LoadAllHandler from "./Application/Query/LoadAll/LoadAllHandler";
import CreateProposal from "./Application/Commands/CreateProposal/CreateProposal";
import CreateProposalHandler from "./Application/Commands/CreateProposal/CreateProposalHandler";
import {NetworkParameters} from "./types";
import JsonParametersType = NetworkParameters.JsonParametersType;

const loadAllHandler = new LoadAllHandler(blockchainRepository, jsonParameters as JsonParametersType);
const createProposalHandler = new CreateProposalHandler();

export {LoadAll, loadAllHandler};
export {CreateProposal, createProposalHandler};
