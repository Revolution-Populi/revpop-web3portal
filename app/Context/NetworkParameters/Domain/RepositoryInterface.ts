import {NetworkParameters} from "../types";
import BlockchainParametersType = NetworkParameters.BlockchainParametersType;

export default interface RepositoryInterface {
    load: () => Promise<BlockchainParametersType>;
}
