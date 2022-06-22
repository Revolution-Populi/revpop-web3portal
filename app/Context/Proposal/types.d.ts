import {Set} from "immutable";
import Proposal from "./Domain/Proposal";
import Parameter from "./Domain/Parameter";

export namespace ProposalTypes {
    type FeeType = {
        amount: number;
        asset_id: string;
    };

    export type BlockchainParametersType = {
        [key: string]: BlockchainParameterType;
    };

    type BlockchainParameterType = string | number | boolean | BlockchainParametersType;

    type ProposalTransactionOperationsBlockchainType = {
        fee: FeeType;
        new_parameters: BlockchainParametersType;
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

    export type ProposalCreateType = {
        transaction: unknown;
        expirationTime: number;
        reviewPeriod: number;
    };

    export type ProposalsCreateType = Set<ProposalCreateType>;

    export type ProposalsType = Set<Proposal>;

    export type ParametersType = Set<Parameter>;

    export type ParameterValueType = Extract<BlockchainParameterType, string | number | boolean>;
}
