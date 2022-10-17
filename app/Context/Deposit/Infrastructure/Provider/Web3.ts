import Web3 from "web3";
import {AbiItem} from "web3-utils";
import ProviderInterface from "./ProviderInterface";
import Response from "./Response";
import {provider, TransactionReceipt} from "web3-core";
import contractAbi from "../../../../assets/abi/HashedTimelock.json";
import Request from "./Request";

export default class Web3Provider implements ProviderInterface {
    async create(request: Request): Promise<Response> {
        const web3 = new Web3(window.ethereum as provider);

        const contract = new web3.eth.Contract(contractAbi as AbiItem[], request.contractAddress);

        return new Promise((resolve, reject) => {
            contract.methods
                .newContract(request.receiver, request.hashLock, request.timeLock)
                .send({
                    from: request.fromAddress,
                    value: request.amount
                })
                .on("transactionHash", (hash: string) => {
                    // console.log(hash);
                })
                .on("confirmation", (confirmationNumber: number, receipt: TransactionReceipt) => {
                    if (confirmationNumber === 1) {
                        resolve(new Response(true, receipt.transactionHash));
                    }
                })
                .on("receipt", function(receipt: any) {
                    // console.log("receipt", receipt);
                })
                .on("error", function(error: any, receipt: TransactionReceipt) {
                    reject(new Response(false, ""));
                });
        });
    }
}
