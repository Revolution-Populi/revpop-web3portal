import Proposal from "./Proposal";
import {ProposalTypes} from "../types";
import ProposalBlockchainType = ProposalTypes.ProposalBlockchainType;

export default interface FactoryInterface {
    fromBlockchain: (
        proposal: ProposalBlockchainType,
        accountId: string
    ) => Proposal;
}
