import {NetworkParameters} from "../../NetworkParameters/types";
import ProposalsType = NetworkParameters.ProposalsType;
import ProposalType = NetworkParameters.ProposalType;

export default interface RepositoryInterface {
    create: (proposal: ProposalType) => void;
    loadAll: () => Promise<ProposalsType>;
}
