import Web3 from "web3";
import {provider, TransactionReceipt} from "web3-core";
import {AbiItem} from "web3-utils";
import depositContractAbi from "../../../../assets/abi/DepositHashedTimelock.json";
import withdrawContractAbi from "../../../../assets/abi/WithdrawHashedTimelock.json";
import ExternalBlockchainRepositoryInterface from "../../Domain/ExternalBlockchain/RepositoryInterface";
import CreateNewContractRequest from "../../Domain/ExternalBlockchain/CreateNewContractRequest";
import CreateNewContractResponse from "../../Domain/ExternalBlockchain/CreateNewContractResponse";
import RedeemWithdrawRequest from "../../Domain/ExternalBlockchain/RedeemWithdrawRequest";
import RedeemWithdrawResponse from "../../Domain/ExternalBlockchain/RedeemWithdrawResponse";
import * as Errors from "./Errors";

export default class Web3Repository
    implements ExternalBlockchainRepositoryInterface {
    async create(
        command: CreateNewContractRequest
    ): Promise<CreateNewContractResponse> {
        const web3 = new Web3(window.ethereum as provider);

        const contract = new web3.eth.Contract(
            depositContractAbi as AbiItem[],
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
            depositContractAbi as AbiItem[],
            contractAddress
        );

        return await contract.methods.getContract(contractId).call();
    }

    async getChainId(): Promise<number> {
        const web3 = new Web3(window.ethereum as provider);

        return web3.eth.getChainId();
    }

    async redeemWithdraw(
        request: RedeemWithdrawRequest
    ): Promise<RedeemWithdrawResponse> {
        const web3 = new Web3(window.ethereum as provider);

        const contract = new web3.eth.Contract(
            withdrawContractAbi as AbiItem[],
            request.contractAddress
        );

        const currentAddress = await this.getCurrentAddress();

        if (currentAddress == null) {
            throw new Errors.CurrentAddressNotSelectedError();
        }

        return new Promise((resolve, reject) => {
            contract.methods
                .withdraw(
                    request.contractId,
                    web3.utils.asciiToHex(request.preimage)
                )
                .send({
                    from: request.receiver
                })
                .on(
                    "confirmation",
                    (
                        confirmationNumber: number,
                        receipt: TransactionReceipt
                    ) => {
                        if (confirmationNumber === 1) {
                            resolve(
                                new RedeemWithdrawResponse(
                                    true,
                                    receipt.transactionHash
                                )
                            );
                        }
                    }
                )
                .catch((e: unknown) => {
                    console.log("Error:", e);
                    reject(e);
                });
        });
    }

    async getCurrentAddress(): Promise<string | null> {
        const accounts = await window.ethereum.request<string[]>({
            method: "eth_accounts"
        });

        if (
            accounts === null ||
            accounts === undefined ||
            accounts.length === 0
        ) {
            return null;
        }

        return accounts[0] as string;
    }
}
