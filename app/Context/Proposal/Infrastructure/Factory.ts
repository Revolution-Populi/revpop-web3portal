import {Set} from "immutable";
import moment from "moment";
import FactoryInterface from "../Domain/FactoryInterface";
import Proposal from "../Domain/Proposal";
import {ProposalTypes} from "../types";
import ProposalBlockchainType = ProposalTypes.ProposalBlockchainType;

class Factory implements FactoryInterface {
    fromBlockchain(
        blockchainProposal: ProposalBlockchainType,
        accountId: string
    ): Proposal {
        const proposal = new Proposal(
            blockchainProposal.id,
            Set(),
            moment(blockchainProposal.expiration_time),
            moment(blockchainProposal.review_period_time)
        );

        if (blockchainProposal.available_active_approvals.includes(accountId)) {
            proposal.setVoted();
        }

        return proposal;
    }
}

export default new Factory();
