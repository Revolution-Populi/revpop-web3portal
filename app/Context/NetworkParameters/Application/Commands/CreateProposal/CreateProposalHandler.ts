import NetworkParameter from "../../../../NetworkParameters/Domain/NetworkParameter";
import CreateProposal from "./CreateProposal";
import {Result} from "../../../../Core/Logic/Result";
import {AppError} from "../../../../Core/Logic/AppError";
import WalletApi from "../../../../../api/WalletApi";
import {createProposal} from "../../../../Proposal/Facade";
import {NetworkParameters} from "../../../types";
import BlockchainParametersType = NetworkParameters.BlockchainParametersType;
import BlockchainParameterType = NetworkParameters.BlockchainParameterType;
import ParametersType = NetworkParameters.ParametersType;

export default class CreateProposalHandler {
    async execute(command: CreateProposal): Promise<Result<AppError, boolean>> {
        const transaction = WalletApi.new_transaction();
        transaction.add_type_operation(
            "committee_member_update_global_parameters",
            {
                fee: {
                    amount: 0,
                    asset_id: "1.3.0"
                },
                new_parameters: this.parameterMapToObject(command.parameters)
            }
        );

        return await createProposal(
            transaction,
            command.expirationTime,
            this.reviewPeriod(command.parameters)
        );
    }

    private parameterMapToObject(
        parameters: ParametersType
    ): BlockchainParametersType {
        const objectParameters: BlockchainParametersType = {};

        parameters.forEach(parameter => {
            parameter = parameter as NetworkParameter;
            const name = parameter.name;

            if (parameter.isLink()) {
                objectParameters[
                    name
                ] = parameter.linkValue as BlockchainParameterType;
            }

            if (parameter.isNormal()) {
                const value = parameter.isModified()
                    ? parameter.newValue
                    : parameter.value;

                objectParameters[name] = value as BlockchainParameterType;
            }

            if (parameter.isGroup()) {
                objectParameters[name] = this.parameterMapToObject(
                    parameter.children
                );
            }
        });

        return objectParameters;
    }

    private reviewPeriod(parameters: ParametersType): number {
        const reviewPeriodParameter = parameters.get(
            "committee_proposal_review_period"
        );
        return reviewPeriodParameter.value as number;
    }
}
