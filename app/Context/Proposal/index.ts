import proposalRepository from "./Infrastructure/BlockchainRepository";

import LoadAll from "./Application/Query/LoadAll/LoadAll";
import LoadAllHandler from "./Application/Query/LoadAll/LoadAllHandler";
import {loadAllParameters} from "../NetworkParameters/Facade";
const loadAllHandler = new LoadAllHandler(
    proposalRepository,
    loadAllParameters
);

export {LoadAll, loadAllHandler};

import Vote from "./Application/Commands/Vote/Vote";
import VoteHandler from "./Application/Commands/Vote/VoteHandler";
const voteHandler = new VoteHandler(proposalRepository);

export {Vote, voteHandler};

import RevokeVote from "./Application/Commands/RevokeVote/RevokeVote";
import RevokeVoteHandler from "./Application/Commands/RevokeVote/RevokeVoteHandler";
const revokeVoteHandler = new RevokeVoteHandler(proposalRepository);

export {RevokeVote, revokeVoteHandler};
