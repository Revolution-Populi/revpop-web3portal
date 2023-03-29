import Web3 from "web3";
import {provider, TransactionReceipt} from "web3-core";
import {AbiItem} from "web3-utils";
import contractAbi from "../../../../assets/abi/HashedTimelock.json";
import ExternalBlockchainRepositoryInterface from "../../Domain/ExternalBlockchain/RepositoryInterface";
import CreateNewContractRequest from "../../Domain/ExternalBlockchain/CreateNewContractRequest";
import CreateNewContractResponse from "../../Domain/ExternalBlockchain/CreateNewContractResponse";

export default class Web3Repository
    implements ExternalBlockchainRepositoryInterface {
    async create(
        command: CreateNewContractRequest
    ): Promise<CreateNewContractResponse> {
        const web3 = new Web3(window.ethereum as provider);

        const contract = new web3.eth.Contract(
            contractAbi as AbiItem[],
            command.contractAddress
        );

        return new Promise((resolve, reject) => {
            contract.methods
                .newContract(
                    command.receiver,
                    command.hashLock,
                    command.timeLock
                )
                .send({
                    from: command.senderAddress,
                    value: command.amount
                })
                .on(
                    "confirmation",
                    (
                        confirmationNumber: number,
                        receipt: TransactionReceipt
                    ) => {
                        if (confirmationNumber === 1) {
                            resolve(
                                new CreateNewContractResponse(
                                    true,
                                    receipt.transactionHash
                                )
                            );
                        }
                    }
                )
                .on("error", function(error: any, receipt: TransactionReceipt) {
                    reject(new CreateNewContractResponse(false, ""));
                });
        });
    }

    async getTransactionReceipt(
        txHash: string
    ): Promise<TransactionReceipt | null> {
        const web3 = new Web3(window.ethereum as provider);

        return await web3.eth.getTransactionReceipt(txHash);
    }

    async getContract(
        contractId: string,
        contractAddress: string
    ): Promise<any | null> {
        const web3 = new Web3(window.ethereum as provider);

        const contract = new web3.eth.Contract(
            contractAbi as AbiItem[],
            contractAddress
        );

        return await contract.methods.getContract(contractId).call();
    }

    async getChainId(): Promise<number> {
        const web3 = new Web3(window.ethereum as provider);

        return web3.eth.getChainId();
    }
}
