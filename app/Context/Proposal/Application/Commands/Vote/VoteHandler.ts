import Vote from "./Vote";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {Failure, Result, Success} from "../../../../Core/Logic/Result";
import {AppError} from "../../../../Core/Logic/AppError";
import Proposal from "../../../Domain/Proposal";

export default class VoteHandler {
    constructor(private repository: RepositoryInterface) {}

    async execute(command: Vote): Promise<Result<AppError, Proposal>> {
        const proposal = command.proposal;

        if (undefined === proposal) {
            return Failure.create(new AppError("proposal is not found"));
        }

        try {
            await this.repository.vote(proposal.id);
        } catch (error) {
            return Failure.create(new AppError(error));
        }

        proposal.setVoted();

        return Success.create(proposal);
    }
}
