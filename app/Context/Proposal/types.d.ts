import {Set} from "immutable";
import Proposal from "./Domain/Proposal";
import Parameter from "./Domain/Parameter";

export namespace ProposalTypes {
    type FeeType = {
        amount: number;
        asset_id: string;
    };

    export type ParameterObjectBlockchainValueType = {
        [key: string]: ParameterBlockchainValueType;
    };

    type ParameterBlockchainValueType =
        | string
        | number
        | boolean
        | ParameterObjectBlockchainValueType;

    type ProposalTransactionOperationsBlockchainType = {
        fee: FeeType;
        new_parameters: ParameterObjectBlockchainValueType;
    };

    export type ProposalTransactionBlockchainType = {
        ref_block_num: number;
        ref_block_prefix: number;
        expiration: string;
        operations: [number, ProposalTransactionOperationsBlockchainType][];
        extensions: never[];
    };

    export type ProposalBlockchainType = {
        available_active_approvals: string[];
        available_key_approvals: string[];
        available_owner_approvals: string[];
        expiration_time: string;
        fail_reason: string;
        id: string;
        proposed_transaction: ProposalTransactionBlockchainType;
        proposer: string;
        required_active_approvals: string[];
        required_owner_approvals: string[];
        review_period_time: string;
    };

    export type ProposalsType = Set<Proposal>;

    export type ParametersType = Set<Parameter>;

    export type ParameterValueType = Extract<
        ParameterBlockchainValueType,
        string | number | boolean
    >;
}
