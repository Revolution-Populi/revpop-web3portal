import {Set} from "immutable";
import moment from "moment";
import FactoryInterface from "../Domain/FactoryInterface";
import Proposal from "../Domain/Proposal";
import {ProposalTypes} from "../types";
import ProposalBlockchainType = ProposalTypes.ProposalBlockchainType;
import ParametersType = ProposalTypes.ParametersType;
import BlockchainParametersType = ProposalTypes.BlockchainParametersType;
import ParameterValueType = ProposalTypes.ParameterValueType;
import Parameter from "../Domain/Parameter";

const UPDATE_GLOBAL_PARAMETERS_TRANSACTION_ID = 27;

class Factory implements FactoryInterface {
    fromBlockchain(blockchainProposal: ProposalBlockchainType, accountId: string): Proposal {
        const operation = blockchainProposal.proposed_transaction.operations[0];

        if (operation[0] != UPDATE_GLOBAL_PARAMETERS_TRANSACTION_ID) {
            throw new Error("Invalid proposed operation id");
        }

        const proposal = new Proposal(
            blockchainProposal.id,
            this.transformParameters(operation[1].new_parameters),
            moment(blockchainProposal.expiration_time),
            moment(blockchainProposal.review_period_time)
        );

        if (blockchainProposal.available_active_approvals.includes(accountId)) {
            proposal.setVoted();
        }

        return proposal;
    }

    private transformParameters(newParameters: BlockchainParametersType): ParametersType {
        const parameters = Set<Parameter>().asMutable();

        for (const newParameterName in newParameters) {
            //TODO::parameters with children
            if (typeof newParameters[newParameterName] == "object") {
                continue;
            }

            const newParameterValue = newParameters[newParameterName] as ParameterValueType;

            const parameter = Parameter.create(newParameterName, newParameterValue);
            parameters.add(parameter);
        }

        return parameters.asImmutable();
    }
}

export default new Factory();
