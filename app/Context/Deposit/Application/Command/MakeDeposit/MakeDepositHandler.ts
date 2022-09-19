import MakeDeposit from "./MakeDeposit";
import {AppError, Result} from "../../../../Core";
import ProviderResolver from "../../../Infrastructure/Provider/ProviderResolver";
import HTLC from "../../../Domain/HTLC";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import SessionConfirmerInterface from "../../../Domain/SessionConfirmerInterface";
import Session from "../../../Domain/Session";
import {SessionAlreadyPaid, SessionNotFoundError} from "./Errors";
import {Failure, Success} from "../../../../Core/Logic/Result";
import {BlockchainConnectionError, EesConnectionError} from "../../../../Core/Logic/AppError";

export default class MakeDepositHandler {
    constructor(
        private _sessionRepository: SessionRepositoryInterface,
        private _sessionConfirmer: SessionConfirmerInterface
    ) {}

    async execute(command: MakeDeposit): Promise<Result<AppError, Session>> {
        const session = await this._sessionRepository.load(command.sessionId);

        if (session === null) {
            return Failure.create(new SessionNotFoundError(command.sessionId));
        }

        if (!session.canBePaid()) {
            return Failure.create(new SessionAlreadyPaid(command.sessionId));
        }

        const htlc = new HTLC(command.fromAddress, command.amount, command.hashLock, command.timeLock);

        // Create HTLC in ETH blockchain
        const provider = ProviderResolver.resolve(command.blockchainType);
        const createHTLCResult = await provider.create(htlc);

        if (!createHTLCResult.isSuccess()) {
            return Failure.create(new AppError(new BlockchainConnectionError()));
        }

        // Send confirm request to EES
        const sessionConfirmResult = await this._sessionConfirmer.confirm(
            command.sessionId,
            command.revpopAccount,
            createHTLCResult.txHash,
            command.hashLock
        );

        if (!sessionConfirmResult) {
            return Failure.create(new AppError(new EesConnectionError()));
        }

        session.pay(createHTLCResult.txHash);
        await this._sessionRepository.save(session);

        return Success.create<Session>(session);
    }
}
