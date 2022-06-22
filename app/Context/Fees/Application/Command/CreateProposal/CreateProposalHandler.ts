import WalletApi from "../../../../../api/WalletApi";
import CreateProposal from "./CreateProposal";
import {Result, Success} from "../../../../Core/Logic/Result";
import {AppError} from "../../../../Core/Logic/AppError";
import {createProposal} from "../../../../Proposal/Facade";
import {Fees} from "../../../types";
import OperationsType = Fees.OperationsType;
import {loadAllRawParameters} from "../../../../NetworkParameters/Facade";
import BlockchainTypeTransformer from "./BlockchainTypeTransformer";
import {NetworkParameters} from "../../../../NetworkParameters/types";
import BlockchainParametersType = NetworkParameters.BlockchainParametersType;

export default class CreateProposalHandler {
    constructor(private blockchainTypeTransformer: BlockchainTypeTransformer) {}

    async execute(command: CreateProposal): Promise<Result<AppError, boolean>> {
        const transaction = WalletApi.new_transaction();
        const newParameters = await this.getParameters(command.operations);

        transaction.add_type_operation("committee_member_update_global_parameters", {
            fee: {
                amount: 0,
                asset_id: "1.3.0"
            },
            new_parameters: newParameters
        });

        return await createProposal(transaction, command.expirationTime, this.reviewPeriod(newParameters));
        // return Success.create(true);
    }

    private async getParameters(operations: OperationsType): Promise<BlockchainParametersType> {
        const blockchainOperations = this.blockchainTypeTransformer.transform(operations);

        const parameters = await loadAllRawParameters();
        //@ts-ignore
        parameters.current_fees.parameters = blockchainOperations;

        return parameters;
    }

    private reviewPeriod(parameters: BlockchainParametersType): number {
        return parameters.committee_proposal_review_period as number;
    }
}
