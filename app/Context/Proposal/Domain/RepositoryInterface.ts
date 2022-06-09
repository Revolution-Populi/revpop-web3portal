import {NetworkParameters} from "../../NetworkParameters/types";
import ProposalType = NetworkParameters.ProposalType;
import {ProposalTypes} from "../types";
import ProposalsType = ProposalTypes.ProposalsType;

export default interface RepositoryInterface {
    create: (proposal: ProposalType) => void;
    loadAll: () => Promise<ProposalsType>;
    vote: (proposalId: string) => void;
    revokeVote: (proposalId: string) => void;
}
