import NetworkParameter from "./NetworkParameter";
import {NetworkParameters} from "../types";
import BlockchainParameterType = NetworkParameters.BlockchainParameterType;

export default interface FactoryInterface {
    create: (name: string, value: BlockchainParameterType) => NetworkParameter;
}
