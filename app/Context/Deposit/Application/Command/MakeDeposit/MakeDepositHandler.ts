import MakeDeposit from "./MakeDeposit";
import HTLC from "../../../Domain/HTLC";
import ProviderInterface from "../../../Infrastructure/Provider/ProviderInterface";
import Web3 from "../../../Infrastructure/Provider/Web3";
import CreateHtlcResponse from "../../../Infrastructure/Provider/CreateHtlcResponse";

export default class MakeDepositHandler {
    async execute(command: MakeDeposit): Promise<CreateHtlcResponse> {
        const provider = this.resolveProvider(command.blockchainType);

        const htlc = new HTLC(
            command.fromAddress,
            command.amount,
            command.hash,
            command.timeLock
        );

        return await provider.create(htlc);
    }

    private resolveProvider(providerType: string): ProviderInterface {
        //Now only web3 with metamask
        return new Web3();
    }
}
