import MakeDeposit from "./MakeDeposit";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import EesRepositoryInterface from "../../../Infrastructure/EES/Repository";
import ExternalBlockchainRepositoryInterface from "../../../Domain/ExternalBlockchain/RepositoryInterface";
import Session from "../../../Domain/Session";
import CreateNewExternalContractRequest from "../../../Domain/ExternalBlockchain/CreateNewContractRequest";
import * as Errors from "./Errors";

export default class MakeDepositHandler {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly eesRepository: EesRepositoryInterface,
        private readonly web3Repository: ExternalBlockchainRepositoryInterface
    ) {}

    async execute(command: MakeDeposit): Promise<Session> {
        const session = await this.sessionRepository.load(command.sessionId);

        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }

        if (!session.isCreated()) {
            throw new Errors.SessionAlreadyPaid(command.sessionId);
        }

        const settings = await this.eesRepository.loadDepositSettings();

        // Create Contract in the blockchain
        const createNewExternalContractRequest = new CreateNewExternalContractRequest(
            settings.contractAddress,
            settings.receiverAddress,
            session.value,
            this.ensureHasPrefix(session.hashLock),
            session.timeLock.unix()
        );

        await this.web3Repository.create(createNewExternalContractRequest);

        // session.pay

        // const createContractResponse = await provider.create(createContractRequest);

        // if (!createContractResponse.isSuccess()) {
        //     throw new BlockchainConnectionError();
        // }

        // session.pay(createContractResponse.txHash, contract);
        // await this._sessionRepository.save(session);

        return session;
    }

    private ensureHasPrefix(hashLock: string) {
        if ("0x" !== hashLock.substring(0, 2)) {
            hashLock = "0x" + hashLock;
        }

        return hashLock;
    }
}
