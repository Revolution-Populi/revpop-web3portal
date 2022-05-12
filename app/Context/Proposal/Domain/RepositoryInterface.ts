import {Set} from "immutable";
import {ParameterObjectValueType} from "../../NetworkParameters/Domain/RepositoryInterface";

export type Proposal = {
    parameters: ParameterObjectValueType;
    expiration_time: number;
};

export type Proposals = Set<Proposal>;

export default interface RepositoryInterface {
    create: (proposal: Proposal) => void;
    loadAll: () => Proposals;
}
