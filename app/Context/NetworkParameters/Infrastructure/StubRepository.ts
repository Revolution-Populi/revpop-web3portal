import RepositoryInterface from "../Domain/RepositoryInterface";
import {NetworkParameters} from "../types";
import BlockchainParametersType = NetworkParameters.BlockchainParametersType;
import BlockchainParameterType = NetworkParameters.BlockchainParameterType;

class StubRepository implements RepositoryInterface {
    private items: BlockchainParametersType = {};

    add(key: string, value: BlockchainParameterType): void {
        this.items[key] = value;
    }

    clear() {
        this.items = {};
    }

    async load(): Promise<BlockchainParametersType> {
        return this.items;
    }
}

export default new StubRepository();
