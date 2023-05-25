import CheckWithdrawContractReadyToSign from "./CheckWithdrawContractReadyToSign";
import * as Errors from "./Errors";
import EesRepository from "../../../Infrastructure/EES/Repository";
import WithdrawSessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import IndexedDBWithdrawSessionRepository from "../../../Infrastructure/WithdrawSessionRepository/IndexedDBWithdrawSessionRepository";

export default class CheckWithdrawContractReadyToSignHandler {
    constructor(
        private readonly sessionRepository: WithdrawSessionRepositoryInterface,
        private readonly eesRepository: EesRepository
    ) {}

    async execute(command: CheckWithdrawContractReadyToSign): Promise<boolean> {
        const session = await this.sessionRepository.load(command.sessionId);

        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }

        if (
            await this.eesRepository.checkWithdrawReadyToSignInExternalBlockchain(
                command.sessionId
            )
        ) {
            session.readyToSignInExternalBlockchain();
            await this.sessionRepository.save(session);
            return true;
        }

        return false;
    }

    public static create(): CheckWithdrawContractReadyToSignHandler {
        const sessionRepository = new IndexedDBWithdrawSessionRepository();
        const eesRepository = new EesRepository();
        return new CheckWithdrawContractReadyToSignHandler(
            sessionRepository,
            eesRepository
        );
    }
}
