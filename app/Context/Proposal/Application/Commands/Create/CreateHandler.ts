import Create from "./Create";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {Failure, Result, Success} from "../../../../Core/Logic/Result";
import {AppError} from "../../../../Core/Logic/AppError";
import {ProposalTypes} from "../../../types";
import ProposalCreateType = ProposalTypes.ProposalCreateType;

export default class CreateHandler {
    constructor(private repository: RepositoryInterface) {}

    async execute(command: Create): Promise<Result<AppError, boolean>> {
        const proposal: ProposalCreateType = {
            transaction: command.transaction,
            expirationTime: command.expirationTime.unix(),
            reviewPeriod: command.reviewPeriod
        };

        try {
            await this.repository.create(proposal);
        } catch (error) {
            return Failure.create(new AppError(error));
        }

        return Success.create(true);
    }
}
