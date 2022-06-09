import Vote from "./Vote";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {Either, Failure, Success} from "../../../../Core/Logic/Result";
import {UnexpectedError} from "../../../../Core/Logic/AppError";

type Response = Either<UnexpectedError, void>;

export default class VoteHandler {
    constructor(private repository: RepositoryInterface) {}

    async execute(command: Vote): Promise<Response> {
        try {
            await this.repository.vote(command.proposalId);
        } catch (error) {
            return Failure.create(new UnexpectedError(error)) as Response;
        }

        return Success.create() as Response;
    }
}
