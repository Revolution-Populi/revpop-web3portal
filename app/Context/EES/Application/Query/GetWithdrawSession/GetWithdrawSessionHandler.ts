import GetWithdrawSession from "./GetWithdrawSession";
import Session from "../../../Domain/Withdraw/WithdrawSession";
import {Failure, Result, Success} from "../../../../Core/Logic/Result";
import SessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import {UseCaseError} from "../../../../Core/Logic/AppError";
import {SessionNotFoundError} from "./Errors";

export default class GetWithdrawSessionHandler {
    constructor(private _sessionRepository: SessionRepositoryInterface) {}

    async execute(
        query: GetWithdrawSession
    ): Promise<Result<UseCaseError, Session>> {
        const session = await this._sessionRepository.load(query.sessionId);

        if (session === null) {
            return Failure.create(new SessionNotFoundError(query.sessionId));
        }

        return Success.create(session);
    }
}
