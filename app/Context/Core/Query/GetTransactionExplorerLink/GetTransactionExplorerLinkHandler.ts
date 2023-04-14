import GetTransactionExplorerLink from "./GetTransactionExplorerLink";
import ExternalBlockchainRepositoryInterface from "../../../EES/Domain/ExternalBlockchain/RepositoryInterface";
import etherscanLink from "@metamask/etherscan-link";
import Web3Repository from "../../../EES/Infrastructure/ExternalBlockchain/Web3Repository";
export default class GetTransactionExplorerLinkHandler {
    constructor(
        private externalBlockchainRepository: ExternalBlockchainRepositoryInterface
    ) {}

    async execute(request: GetTransactionExplorerLink): Promise<string> {
        const chainId = await this.externalBlockchainRepository.getChainId();

        return etherscanLink.createExplorerLinkForChain(
            request.session.externalContract?.txHash ?? "",
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
