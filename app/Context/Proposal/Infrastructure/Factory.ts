import {Set} from "immutable";
import moment from "moment";
import FactoryInterface from "../Domain/FactoryInterface";
import Proposal from "../Domain/Proposal";
import Parameter from "../Domain/Parameter";
import Operation from "../Domain/Operation";
import {ProposalTypes} from "../types";
import ProposalBlockchainType = ProposalTypes.ProposalBlockchainType;
import ParametersType = ProposalTypes.ParametersType;
import BlockchainParametersType = ProposalTypes.BlockchainParametersType;
import ParameterValueType = ProposalTypes.ParameterValueType;
import OperationsType = ProposalTypes.OperationsType;
import BlockchainCurrentFeesType = ProposalTypes.BlockchainCurrentFeesType;
import BlockchainCurrentFeesOperationType = ProposalTypes.BlockchainCurrentFeesOperationType;
import Fee from "../Domain/Fee";

const UPDATE_GLOBAL_PARAMETERS_TRANSACTION_ID = 27;

class Factory implements FactoryInterface {
    fromBlockchain(blockchainProposal: ProposalBlockchainType, accountId: string): Proposal {
        const operation = blockchainProposal.proposed_transaction.operations[0];

        if (operation[0] != UPDATE_GLOBAL_PARAMETERS_TRANSACTION_ID) {
            throw new Error("Invalid proposed operation id");
        }

        const currentFees = operation[1].new_parameters.current_fees as BlockchainCurrentFeesType;

        const proposal = new Proposal(
            blockchainProposal.id,
            this.transformParameters(operation[1].new_parameters),
            this.transformCurrentFees(currentFees.parameters),
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

    private transformCurrentFees(blockchainOperations: BlockchainCurrentFeesOperationType[]): OperationsType {
        const operations = Set<Operation>().asMutable();

        for (const blockchainOperation of blockchainOperations) {
            const blockchainFees = blockchainOperation[1];
            const fees = [];
            for (const blockchainFeeCode in blockchainFees) {
                const fee = Fee.create(blockchainFeeCode, blockchainFees[blockchainFeeCode]);
                fees.push(fee);
            }

            const operation = Operation.create(blockchainOperation[0], fees);
            operations.add(operation);
        }

        return operations;
    }
}

export default new Factory();
