import {ProposalTypes} from "../types";
import ProposalCreateType = ProposalTypes.ProposalCreateType;
import ProposalsType = ProposalTypes.ProposalsType;

export default interface RepositoryInterface {
    create: (proposal: ProposalCreateType) => void;
    loadAll: () => Promise<ProposalsType>;
    vote: (proposalId: string) => void;
    revokeVote: (proposalId: string) => void;
}
