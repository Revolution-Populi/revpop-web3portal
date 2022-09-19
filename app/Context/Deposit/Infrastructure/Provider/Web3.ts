import Web3 from "web3";
import {AbiItem} from "web3-utils";
import ProviderInterface from "./ProviderInterface";
import CreateHtlcResponse from "./CreateHtlcResponse";
import {provider, TransactionReceipt} from "web3-core";
import contractAbi from "../../../../assets/abi/HashedTimelock.json";
import HTLC from "../../Domain/HTLC";

export default class Web3Provider implements ProviderInterface {
    async create(htlc: HTLC): Promise<CreateHtlcResponse> {
        const web3 = new Web3(window.ethereum as provider);

        const contractAddress = "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144";
        const receiver = "0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E";

        const contract = new web3.eth.Contract(contractAbi as AbiItem[], contractAddress);

        return new Promise((resolve, reject) => {
            contract.methods
                .newContract(receiver, htlc.hashLock, htlc.timeLock)
                .send({
                    from: htlc.fromAddress,
                    value: htlc.amount
                })
                .on("transactionHash", (hash: string) => {
                    // console.log(hash);
                })
                .on("confirmation", (confirmationNumber: number, receipt: TransactionReceipt) => {
                    if (confirmationNumber === 1) {
                        resolve(new CreateHtlcResponse(true, receipt.transactionHash));
                    }
                })
                .on("receipt", function(receipt: any) {
                    // console.log("receipt", receipt);
                })
                .on("error", function(error: any, receipt: TransactionReceipt) {
                    reject(new CreateHtlcResponse(false, ""));
                });
        });
    }
}
