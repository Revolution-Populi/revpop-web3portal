import {TransactionReceipt} from "web3-core";
import CreateNewContractRequest from "./CreateNewContractRequest";
import CreateNewContractResponse from "./CreateNewContractResponse";

export default interface ExternalBlockchainRepositoryInterface {
    create: (
        createNewContractRequest: CreateNewContractRequest
    ) => Promise<CreateNewContractResponse>;

    getTransactionReceipt: (
        txHasn: string
    ) => Promise<TransactionReceipt | null>;
    getContract: (
        contractId: string,
        contractAddress: string
    ) => Promise<any | null>;
    getChainId: () => Promise<number>;
}
