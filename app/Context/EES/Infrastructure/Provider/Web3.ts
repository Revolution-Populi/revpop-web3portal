import Web3 from "web3";
import ProviderInterface from "./ProviderInterface";
import CreateHtlcResponse from "./CreateHtlcResponse";
import {provider} from "web3-core";
import contractAbi from "../../../../assets/abi/DepositHashedTimelock.json";
import HTLC from "../../Domain/HTLC";

export default class Web3Provider implements ProviderInterface {
    async create(htlc: HTLC): Promise<CreateHtlcResponse> {
        const web3 = new Web3(window.ethereum as provider);

        const contractAddress = "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144";
        const receiver = "0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E";

        //@ts-ignore
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        return new Promise((resolve, reject) => {
            contract.methods
                .newContract(receiver, htlc.hash, htlc.timeout)
                .send({
                    from: htlc.fromAddress,
                    value: htlc.amount
                })
                .on("transactionHash", (hash: string) => {
                    // console.log(hash);
                })
                .on(
                    "confirmation",
                    (confirmationNumber: number, receipt: any) => {
                        if (confirmationNumber === 1) {
                            resolve(
                                new CreateHtlcResponse(
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
                .on("error", function(error: any, receipt: any) {
                    reject(new CreateHtlcResponse(false, ""));
                });
        });
    }
}
