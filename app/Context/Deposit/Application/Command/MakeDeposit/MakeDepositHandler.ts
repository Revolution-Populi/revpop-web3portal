import MakeDeposit from "./MakeDeposit";
import {Either, left, Result, right, EesConnectionError, UnexpectedError} from "../../../../Core";
import ProviderResolver from "../../../Infrastructure/Provider/ProviderResolver";
import HTLC from "../../../Domain/HTLC";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import SessionConfirmerInterface from "../../../Domain/SessionConfirmerInterface";
import Session from "../../../Domain/Session";
import {SessionAlreadyPayed, SessionNotFoundError} from "./Errors";

type Response = Either<UnexpectedError, Result<Session>>;

export default class MakeDepositHandler {
    constructor(
        private _sessionRepository: SessionRepositoryInterface,
        private _sessionConfirmer: SessionConfirmerInterface
    ) {}

    async execute(command: MakeDeposit): Promise<Response> {
        const session = await this._sessionRepository.load(command.sessionId);

        if (session === null) {
            return left(new SessionNotFoundError(command.sessionId));
        }

        if (!session.canBePaid()) {
            return left(new SessionAlreadyPayed(command.sessionId));
        }

        const htlc = new HTLC(command.fromAddress, command.amount, command.hashLock, command.timeLock);

        // Create HTLC in ETH blockchain
        const provider = ProviderResolver.resolve(command.blockchainType);
        const createHTLCResult = await provider.create(htlc);

        if (!createHTLCResult.isSuccess()) {
            return left(new SessionAlreadyPayed(command.sessionId));
        }

        // Send confirm request to EES
        const sessionConfirmResult = await this._sessionConfirmer.confirm(
            command.sessionId,
            command.revpopAccount,
            createHTLCResult.txHash,
            command.hashLock
        );

        if (!sessionConfirmResult) {
            return left(EesConnectionError.create());
        }

        session.pay(createHTLCResult.txHash);
        await this._sessionRepository.save(session);

        return right(Result.ok<Session>(session));
    }
}
