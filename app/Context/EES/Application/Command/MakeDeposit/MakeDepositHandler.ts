import MakeDeposit from "./MakeDeposit";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import EesRepositoryInterface from "../../../Infrastructure/EES/Repository";
import ExternalBlockchainRepositoryInterface from "../../../Domain/ExternalBlockchain/RepositoryInterface";
import ExternalContract from "../../../Domain/ExternalBlockchain/DepositContract";
import CreateNewExternalContractRequest from "../../../Domain/ExternalBlockchain/CreateNewContractRequest";
import * as Errors from "./Errors";
import {BlockchainConnectionError} from "../../../../Core/Logic/AppError";

export default class MakeDepositHandler {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly eesRepository: EesRepositoryInterface,
        private readonly web3Repository: ExternalBlockchainRepositoryInterface
    ) {}

    async execute(command: MakeDeposit): Promise<boolean> {
        const session = await this.sessionRepository.load(command.sessionId);

        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }

        if (!session.isCreated()) {
            throw new Errors.SessionAlreadyPaid(command.sessionId);
        }

        const settings = await this.eesRepository.loadEESSettings();

        const createNewExternalContractRequest = new CreateNewExternalContractRequest(
            command.senderAddress,
            settings.depositContractAddress,
            settings.receiverAddress,
            session.value,
            this.ensureHasPrefix(session.hashLock),
            session.timeLock.unix()
        );

        const createContractResponse = await this.web3Repository.create(
            createNewExternalContractRequest
        );

        if (!createContractResponse.success) {
            throw new BlockchainConnectionError();
        }

        const externalContract = ExternalContract.create(
            createContractResponse.txHash
        );
        session.pay(externalContract);
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
