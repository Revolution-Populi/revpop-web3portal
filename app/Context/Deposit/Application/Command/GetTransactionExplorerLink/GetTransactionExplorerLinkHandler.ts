import GetTransactionExplorerLink from "./GetTransactionExplorerLink";
import ExternalBlockchainRepositoryInterface from "../../../Domain/ExternalBlockchain/RepositoryInterface";
import etherscanLink from "@metamask/etherscan-link";
import Web3Repository from "../../../Infrastructure/ExternalBlockchain/Web3Repository";
export default class GetTransactionExplorerLinkHandler {
    constructor(
        private externalBlockchainRepository: ExternalBlockchainRepositoryInterface
    ) {}

    async execute(command: GetTransactionExplorerLink): Promise<string> {
        const chainId = await this.externalBlockchainRepository.getChainId();

        return etherscanLink.createExplorerLinkForChain(
            command.session.externalContract?.txHash ?? "",
            "0x" + chainId.toString(16)
        );
    }

    public static create(): GetTransactionExplorerLinkHandler {
        const externalBlockchainRepository = new Web3Repository();

        return new GetTransactionExplorerLinkHandler(
            externalBlockchainRepository
        );
    }
}
