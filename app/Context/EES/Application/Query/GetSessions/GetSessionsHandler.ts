import GetSessions from "./GetSessions";
import Session from "../../../Domain/Deposit/Session";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import {Result} from "../../../../Core";
import {UseCaseError} from "../../../../Core/Logic/AppError";
import {Success} from "../../../../Core/Logic/Result";

export default class GetSessionsHandler {
    constructor(private sessionRepository: SessionRepositoryInterface) {}

    async execute(
        query: GetSessions
    ): Promise<Result<UseCaseError, Session[]>> {
        const sessions = await this.sessionRepository.all();

        return Success.create(sessions);
    }
}
