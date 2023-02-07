import InternalBlockchainRepositoryInterface from "../../../Domain/InternalBlockchain/RepositoryInterface";
import CheckBlockchainContract from "./CheckBlockchainContract";
import InternalContract from "../../../Domain/InternalBlockchain/Contract";

export default class CheckBlockchainContractHandler {
    constructor(
        private internalBlockchainRepository: InternalBlockchainRepositoryInterface
    ) {}

    async execute(
        command: CheckBlockchainContract
    ): Promise<InternalContract | null> {
        console.log(command);

        return Promise.resolve(null);
    }
}
