import TokenDistributionRequest from "./TokenDistributionRequest";
import TokenDistributionInterface from "./../Domain/TokenDistributionRepositoryInterface";
import {encrypt} from "@metamask/eth-sig-util";

export default class TokenDistributionHandler {
    constructor(
        private tokenDistributionRepository: TokenDistributionInterface
    ) {}

    async execute(command: TokenDistributionRequest): Promise<void> {
        const accounts = (await window.ethereum.request({
            method: "eth_requestAccounts"
        })) as string[];
        const account = accounts[0];
        // Key is returned as base64
        const keyB64 = (await window.ethereum.request({
            method: "eth_getEncryptionPublicKey",
            params: [account]
        })) as string;
        const publicKey = Buffer.from(keyB64, "base64");
        const enc = encrypt({
            publicKey: publicKey.toString("base64"),
            data: command.phrase,
            version: "x25519-xsalsa20-poly1305"
        });
        await this.tokenDistributionRepository.createTokenDistributionRequest(
            command.revpopAccount,
            enc.ciphertext,
            enc.ephemPublicKey
        );
    }
}
