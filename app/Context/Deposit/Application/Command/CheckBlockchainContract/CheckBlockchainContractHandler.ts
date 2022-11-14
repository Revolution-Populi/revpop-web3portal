import {Failure, Result, Success} from "../../../../Core/Logic/Result";
import {BlockchainConnectionError} from "../../../../Core/Logic/AppError";
import CheckBlockchainContract from "./CheckBlockchainContract";
import Session from "../../../Domain/Session";
import HtlcRepositoryInterface from "../../../Domain/HtlcRepositoryInterface";

type ErrorsType = BlockchainConnectionError;

export default class CheckBlockchainContractHandler {
    constructor(private blockchainRepository: HtlcRepositoryInterface) {}

    async execute(
        command: CheckBlockchainContract
    ): Promise<Result<ErrorsType, Session>> {
        console.log(command);

        const htlc = this.blockchainRepository.loadAccountHtlc(command.account);

        return Failure.create(new BlockchainConnectionError());
    }
}
