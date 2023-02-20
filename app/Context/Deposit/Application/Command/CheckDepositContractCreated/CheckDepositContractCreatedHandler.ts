import InternalBlockchainRepositoryInterface from "../../../Domain/InternalBlockchain/RepositoryInterface";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import RevpopRepository from "../../../Infrastructure/InternalBlockchain/Repository/RevpopReposistory";
import SessionIndexedDBRepository from "../../../Infrastructure/SessionRepository/IndexedDB";
import CheckDepositContractCreated from "./CheckDepositContractCreated";
import * as Errors from "./Errors";

export default class CheckDepositContractCreatedHandler {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly internalBlockchainRepository: InternalBlockchainRepositoryInterface
    ) {}

    async execute(command: CheckDepositContractCreated): Promise<boolean> {
        const session = await this.sessionRepository.load(command.sessionId);

        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }

        const internalContracts = await this.internalBlockchainRepository.loadContractsByAccount(
            session.internalAccount
        );

        for (const internalContract of internalContracts) {
            if (
                internalContract.message ===
                this.remove0x(session.externalContract?.txHash as string)
            ) {
                session.createdInternalBlockchain(internalContract);
                await this.sessionRepository.save(session);

                return true;
            }
        }

        return false;
    }

    private remove0x(txHash: string): string {
        if ("0x" === txHash.substring(0, 2)) {
            return txHash.substring(2);
        }

        return txHash;
    }

    public static create(): CheckDepositContractCreatedHandler {
        const sessionRepository = new SessionIndexedDBRepository();
        const internalRepository = new RevpopRepository();
        return new CheckDepositContractCreatedHandler(
            sessionRepository,
            internalRepository
        );
    }
}
