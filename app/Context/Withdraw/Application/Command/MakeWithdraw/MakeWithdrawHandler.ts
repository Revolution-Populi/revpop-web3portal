import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import EesRepositoryInterface from "../../../Infrastructure/EES/Repository";
import ExternalBlockchainRepositoryInterface from "../../../Domain/ExternalBlockchain/RepositoryInterface";
import ExternalContract from "../../../Domain/ExternalBlockchain/Contract";
import CreateNewExternalContractRequest from "../../../Domain/ExternalBlockchain/CreateNewContractRequest";
import * as Errors from "./Errors";
import {BlockchainConnectionError} from "../../../../Core/Logic/AppError";
import MakeWithdraw from "./MakeWithdraw";

export default class MakeWithdrawHandler {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly eesRepository: EesRepositoryInterface,
        private readonly web3Repository: ExternalBlockchainRepositoryInterface
    ) {}

    async execute(command: MakeWithdraw): Promise<boolean> {
        // const session = await this.sessionRepository.load(command.sessionId);
        //
        // if (session === null) {
        //     throw new Errors.SessionNotFoundError(command.sessionId);
        // }
        //
        // if (!session.isCreated()) {
        //     throw new Errors.SessionAlreadyPaid(command.sessionId);
        // }
        //
        // const settings = await this.eesRepository.loadWithdrawSettings();
        //
        // const createNewExternalContractRequest = new CreateNewExternalContractRequest(
        //     command.senderAddress,
        //     settings.contractAddress,
        //     settings.receiverAddress,
        //     session.value,
        //     this.ensureHasPrefix(session.hashLock),
        //     session.address
        // );
        //
        // const createContractResponse = await this.web3Repository.create(
        //     createNewExternalContractRequest
        // );
        //
        // if (!createContractResponse.success) {
        //     throw new BlockchainConnectionError();
        // }
        //
        // const externalContract = ExternalContract.create(
        //     createContractResponse.txHash
        // );
        // session.pay(externalContract);
        // await this.sessionRepository.save(session);

        return true;
    }

    private ensureHasPrefix(hashLock: string) {
        if ("0x" !== hashLock.substring(0, 2)) {
            hashLock = "0x" + hashLock;
        }

        return hashLock;
    }
}
