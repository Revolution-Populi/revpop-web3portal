import ConfirmSession from "./ConfirmSession";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import SessionConfirmerInterface from "../../../Domain/SessionConfirmerInterface";
import {EesConnectionError, Result} from "../../../../Core";
import {Failure, Success} from "../../../../Core/Logic/Result";
import {SessionAlreadyPaid, SessionNotFoundError} from "../MakeDeposit/Errors";

type ErrorsType = EesConnectionError | SessionNotFoundError;

export default class ConfirmSessionHandler {
    constructor(
        private sessionRepository: SessionRepositoryInterface,
        private sessionConfirmer: SessionConfirmerInterface
    ) {}

    async execute(command: ConfirmSession): Promise<Result<ErrorsType, void>> {
        const session = await this.sessionRepository.load(command.sessionId);

        if (session === null) {
            return Failure.create(new SessionNotFoundError(command.sessionId));
        }

        if (!session.canBePaid()) {
            return Failure.create(new SessionAlreadyPaid(command.sessionId));
        }

        const resultOrError = await this.sessionConfirmer.confirm(
            command.sessionId,
            command.revpopAccount,
            command.txHash,
            command.hashLock
        );

        if (resultOrError.isFailure()) {
            return resultOrError;
        }

        session.pay(command.txHash);
        await this.sessionRepository.save(session);

        return Success.create(undefined);
    }
}
