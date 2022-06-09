import RevokeVote from "./RevokeVote";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {Either, Failure, Success} from "../../../../Core/Logic/Result";
import {UnexpectedError} from "../../../../Core/Logic/AppError";

type Response = Either<UnexpectedError, void>;

export default class RevokeVoteHandler {
    constructor(private repository: RepositoryInterface) {}

    async execute(command: RevokeVote): Promise<Response> {
        try {
            await this.repository.revokeVote(command.proposalId);
        } catch (error) {
            return Failure.create(new UnexpectedError(error)) as Response;
        }

        return Success.create() as Response;
    }
}
