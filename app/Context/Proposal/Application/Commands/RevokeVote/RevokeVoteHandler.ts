import RevokeVote from "./RevokeVote";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {Failure, Result, Success} from "../../../../Core/Logic/Result";
import {AppError} from "../../../../Core/Logic/AppError";
import Proposal from "../../../Domain/Proposal";

export default class RevokeVoteHandler {
    constructor(private repository: RepositoryInterface) {}

    async execute(command: RevokeVote): Promise<Result<AppError, Proposal>> {
        const proposal = command.proposal;

        try {
            await this.repository.revokeVote(proposal.id);
        } catch (error) {
            return Failure.create(new AppError(error));
        }

        proposal.revokeVote();

        return Success.create(proposal);
    }
}
