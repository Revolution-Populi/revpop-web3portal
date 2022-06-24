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

    export type ParameterType = "bool" | "uint8_t" | "uint16_t" | "uint32_t" | "int64_t" | "link";

    export type JsonParameterType = {
        type: ParameterType;
        description: string | null;
        link?: string | null;
        defaultValue?: BlockchainParameterType | null;
    };

    export type JsonParametersType = {
        [key: string]: JsonParameterType;
    };

    export type NetworkParametersType = Map<string, NetworkParameter>;

    export type ParametersType = Map<string, NetworkParameter>;
}
