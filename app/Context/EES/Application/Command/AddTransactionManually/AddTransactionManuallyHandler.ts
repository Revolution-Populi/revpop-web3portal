import AddTransactionManually from "./AddTransactionManually";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import EesRepositoryInterface from "../../../Infrastructure/EES/Repository";
import ExternalBlockchainRepositoryInterface from "../../../Domain/ExternalBlockchain/RepositoryInterface";
import ExternalContract from "../../../Domain/ExternalBlockchain/DepositContract";
import * as Errors from "./Errors";

export default class AddTransactionManuallyHandler {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly eesRepository: EesRepositoryInterface,
        private readonly web3Repository: ExternalBlockchainRepositoryInterface
    ) {}

    async execute(command: AddTransactionManually): Promise<boolean> {
        const session = await this.sessionRepository.load(command.sessionId);

        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }

        if (!session.isCreated()) {
            throw new Errors.SessionAlreadyPaid(command.sessionId);
        }

        const settings = await this.eesRepository.loadEESSettings();
        const transactionReceipt = await this.web3Repository.getTransactionReceipt(
            command.txHash
        );

        if (transactionReceipt === null) {
            throw new Errors.TransactionNotFound(command.sessionId);
        }

        const log = transactionReceipt["logs"][0];
        const contractId = log["topics"][1];
        const contract = await this.web3Repository.getContract(
            contractId,
            settings.depositContractAddress
        );
        const hashLock = contract.hashlock;

        console.log(session.hashLock, contract, hashLock);
        console.log(
            this.ensureHasPrefix(session.hashLock),
            this.ensureHasPrefix(hashLock)
        );

        if (
            this.ensureHasPrefix(session.hashLock) !==
            this.ensureHasPrefix(hashLock)
        ) {
            throw new Errors.InvalidHashLock(command.txHash);
        }

        const externalContract = ExternalContract.create(command.txHash);
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
