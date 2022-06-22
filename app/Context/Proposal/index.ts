import proposalRepository from "./Infrastructure/BlockchainRepository";

import LoadAll from "./Application/Query/LoadAll/LoadAll";
import LoadAllHandler from "./Application/Query/LoadAll/LoadAllHandler";
import {loadAllParameters} from "../NetworkParameters/Facade";
const loadAllHandler = new LoadAllHandler(proposalRepository, loadAllParameters);

import Create from "./Application/Commands/Create/Create";
import CreateHandler from "./Application/Commands/Create/CreateHandler";
const createHandler = new CreateHandler(proposalRepository);

import Vote from "./Application/Commands/Vote/Vote";
import VoteHandler from "./Application/Commands/Vote/VoteHandler";
const voteHandler = new VoteHandler(proposalRepository);

import RevokeVote from "./Application/Commands/RevokeVote/RevokeVote";
import RevokeVoteHandler from "./Application/Commands/RevokeVote/RevokeVoteHandler";
const revokeVoteHandler = new RevokeVoteHandler(proposalRepository);

export {LoadAll, loadAllHandler};
export {Create, createHandler};
export {Vote, voteHandler};
export {RevokeVote, revokeVoteHandler};
