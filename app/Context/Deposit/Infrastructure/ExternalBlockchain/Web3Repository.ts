import Web3 from "web3";
import {AbiItem} from "web3-utils";
import {provider, TransactionReceipt} from "web3-core";
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
                .on("transactionHash", (hash: string) => {
                    // console.log(hash);
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
                .on("receipt", function(receipt: any) {
                    // console.log("receipt", receipt);
                })
                .on("error", function(error: any, receipt: TransactionReceipt) {
                    reject(new CreateNewContractResponse(false, ""));
                });
        });
    }
}
