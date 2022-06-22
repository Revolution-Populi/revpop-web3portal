import {Map} from "immutable";
import NetworkParameter from "./Domain/NetworkParameter";

export namespace NetworkParameters {
    export type BlockchainParametersType = {
        [key: string]: BlockchainParameterType;
    };

    type currentFees = {
        parameters: (number | BlockchainParametersType)[][];
        scale: number;
    };

    export type BlockchainParameterType = string | number | BlockchainParametersType | currentFees;

    export type NetworkParametersType = Map<string, NetworkParameter>;

    export type ParametersType = Map<string, NetworkParameter>;
}
