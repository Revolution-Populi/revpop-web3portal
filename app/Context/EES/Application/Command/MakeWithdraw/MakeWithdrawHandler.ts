import MakeWithdraw from "./MakeWithdraw";
import SessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import EesRepositoryInterface from "../../../Infrastructure/EES/Repository";
import * as Errors from "./Errors";
import InternalBlockchainRepositoryInterface from "../../../Domain/InternalBlockchain/RepositoryInterface";
// @ts-ignore
import {FetchChain} from "@revolutionpopuli/revpopjs/es";

export default class MakeWithdrawHandler {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly eesRepository: EesRepositoryInterface,
        private readonly internalRepository: InternalBlockchainRepositoryInterface
    ) {}

    async execute(command: MakeWithdraw): Promise<boolean> {
        const session = await this.sessionRepository.load(command.sessionId);

        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }

        if (!session.isCreated()) {
            throw new Errors.SessionAlreadyPaid(command.sessionId);
        }

        const settings = await this.eesRepository.loadEESSettings();
        this.internalRepository.withdraw(settings, session);

        session.submittedInInternalBlockchain();
        await this.sessionRepository.save(session);

        return true;
    }

    private ensureHasPrefix(hashLock: string) {
        if ("0x" !== hashLock.substring(0, 2)) {
            hashLock = "0x" + hashLock;
        }

        return hashLock;
    }
}
