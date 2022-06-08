import {Map, Set} from "immutable";
import NetworkParameter from "./Domain/NetworkParameter";
import {ParameterObjectValueType} from "./Domain/RepositoryInterface";

export namespace NetworkParameters {
    export type ParametersType = Map<string, NetworkParameter>;

    export type ProposalType = {
        parameters: ParameterObjectValueType;
        expirationTime: number;
        reviewPeriod: number;
    };

    export type ProposalsType = Set<Proposal>;
}
