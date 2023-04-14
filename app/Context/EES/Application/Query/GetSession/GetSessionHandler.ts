import GetSession from "./GetSession";
import Session from "../../../Domain/Deposit/Session";
import {Failure, Result, Success} from "../../../../Core/Logic/Result";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import {UseCaseError} from "../../../../Core/Logic/AppError";
import {SessionNotFoundError} from "./Errors";

export default class GetSessionHandler {
    constructor(private _sessionRepository: SessionRepositoryInterface) {}

    async execute(query: GetSession): Promise<Result<UseCaseError, Session>> {
        const session = await this._sessionRepository.load(query.sessionId);

        if (session === null) {
            return Failure.create(new SessionNotFoundError(query.sessionId));
        }

        return Success.create(session);
    }
}
