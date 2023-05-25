import IndexedDBWithdrawSessionRepository from "../../../Infrastructure/WithdrawSessionRepository/IndexedDBWithdrawSessionRepository";
import RedeemWithdraw from "./RedeemWithdraw";
import EESRepositoryInterface from "../../../Domain/EES/RepositoryInterface";
import RedeemWithdrawRequest from "../../../Domain/ExternalBlockchain/RedeemWithdrawRequest";
import {BlockchainConnectionError} from "../../../../Core/Logic/AppError";
import ExternalBlockchainRepositoryInterface from "../../../Domain/ExternalBlockchain/RepositoryInterface";
import * as Errors from "./Errors";
import SessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import Repository from "../../../Infrastructure/EES/Repository";
import Web3Repository from "../../../Infrastructure/ExternalBlockchain/Web3Repository";
import RedeemWithdrawResponse from "../../../Domain/ExternalBlockchain/RedeemWithdrawResponse";

export default class RedeemWithdrawHandler {
    constructor(
        private readonly web3Repository: ExternalBlockchainRepositoryInterface,
        private readonly eesRepository: EESRepositoryInterface,
        private readonly sessionRepository: SessionRepositoryInterface
    ) {}

    async execute(command: RedeemWithdraw): Promise<boolean> {
        const session = await this.sessionRepository.load(command.sessionId);

        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }

        if (!session.isReadyToSignInExternalBlockchain()) {
            throw new Errors.InvalidSessionStatusError(command.sessionId);
        }
        const settings = await this.eesRepository.loadEESSettings();
        const request = new RedeemWithdrawRequest(
            command.contractId,
            command.preimage,
            settings.receiverAddress,
            settings.withdrawContractAddress,
            command.receiverAddress
        );

        let redeemWithdrawResponse: RedeemWithdrawResponse;

        try {
            redeemWithdrawResponse = await this.web3Repository.redeemWithdraw(
                request
            );
        } catch (e) {
            console.log("Error in Handler", e);
            throw new Errors.ExternalBlockchainError((e as Error).message);
        }

        if (!redeemWithdrawResponse.success) {
            throw new BlockchainConnectionError();
        }

        session.redeem(redeemWithdrawResponse.txHash);
        await this.sessionRepository.save(session);

        return true;
    }

    public static create(): RedeemWithdrawHandler {
        const sessionRepository = new IndexedDBWithdrawSessionRepository();
        const eesRepository = new Repository();
        const web3Repository = new Web3Repository();
        return new RedeemWithdrawHandler(
            web3Repository,
            eesRepository,
            sessionRepository
        );
    }
}
