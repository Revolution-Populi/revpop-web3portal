import {Set} from "immutable";
import Proposal from "./Domain/Proposal";

export namespace ProposalTypes {
    type FeeType = {
        amount: number;
        asset_id: string;
    };

    type ProposalTransactionOperationsBlockchainType = {
        fee: FeeType;
        new_parameters: ParameterObjectBlockchainValueType;
    };

    type ProposalTransactionBlockchainType = {
        ref_block_num: number;
        ref_block_prefix: number;
        expiration: string;
        operations: [number, ProposalTransactionOperationsBlockchainType];
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

    export type ProposalsBlockchainType = ProposalBlockchainType[];

    type ParameterObjectBlockchainValueType = {
        [key: string]: ParameterBlockchainValueType;
    };

    type ParameterBlockchainValueType =
        | string
        | number
        | ParameterObjectBlockchainValueType;

    type ParameterType = {
        name: string;
        value: ParameterBlockchainValueType;
    };
    export type ParametersType = Set<ParameterType>;

    type ChangedParameterType = {
        name: string;
        value: ParameterBlockchainValueType;
        newValue: Extract<ParameterBlockchainValueType, string | number>;
    };
    export type ChangedParametersType = Set<ChangedParameterType>;

    export type ProposalsType = Set<Proposal>;
}
