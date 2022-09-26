import MakeDeposit from "./MakeDeposit";
import {Result} from "../../../../Core";
import ProviderResolver from "../../../Infrastructure/Provider/ProviderResolver";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import SessionConfirmerInterface from "../../../Domain/SessionConfirmerInterface";
import Session from "../../../Domain/Session";
import Contract from "../../../Domain/Contract";
import {SessionAlreadyPaid, SessionNotFoundError} from "./Errors";
import {Failure, Success} from "../../../../Core/Logic/Result";
import {UseCaseError, BlockchainConnectionError, EesConnectionError} from "../../../../Core/Logic/AppError";
import Request from "../../../Infrastructure/Provider/Request";

type ErrorsType = UseCaseError | EesConnectionError | BlockchainConnectionError;

export default class MakeDepositHandler {
    constructor(
        private _sessionRepository: SessionRepositoryInterface,
        private _sessionConfirmer: SessionConfirmerInterface
    ) {}

    async execute(command: MakeDeposit): Promise<Result<ErrorsType, Session>> {
        const session = await this._sessionRepository.load(command.sessionId);

        if (session === null) {
            return Failure.create(new SessionNotFoundError(command.sessionId));
        }

        if (!session.canBePaid()) {
            return Failure.create(new SessionAlreadyPaid(command.sessionId));
        }

        // Create Contract in the blockchain
        const createContractRequest = new Request(
            session.smartContractAddress,
            session.receiverAddress,
            command.fromAddress,
            command.amount,
            command.hashLock,
            command.timeLock
        );
        const provider = ProviderResolver.resolve(command.blockchainType);
        const createContractResponse = await provider.create(createContractRequest);

        if (!createContractResponse.isSuccess()) {
            return Failure.create(new BlockchainConnectionError());
        }

        // Send confirm request to EES
        const sessionConfirmResult = await this._sessionConfirmer.confirm(
            command.sessionId,
            command.revpopAccount,
            createContractResponse.txHash,
            command.hashLock
        );

        if (!sessionConfirmResult) {
            return Failure.create(new EesConnectionError());
        }

        const contract = new Contract(
            command.fromAddress,
            session.receiverAddress,
            command.amount,
            command.hashLock,
            command.timeLock
        );

        session.pay(createContractResponse.txHash, contract);
        await this._sessionRepository.save(session);

        return Success.create<Session>(session);
    }
}
