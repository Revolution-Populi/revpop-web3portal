import {Set} from "immutable";

export type ParameterObjectValueType = {
    [key: string]: ParameterValueType;
};

export type ParameterValueType = string | number | ParameterObjectValueType;

export type Proposal = {
    parameters: ParameterObjectValueType;
    expiration_time: number;
};

export type Proposals = Set<Proposal>;

export default interface RepositoryInterface {
    create: (proposal: Proposal) => void;
    loadAll: () => Proposals;
}
