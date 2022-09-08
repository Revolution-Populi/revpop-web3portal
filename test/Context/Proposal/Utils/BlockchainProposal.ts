import {ProposalTypes} from "../../../../app/Context/Proposal/types";
import ProposalBlockchainType = ProposalTypes.ProposalBlockchainType;
import ProposalTransactionBlockchainType = ProposalTypes.ProposalTransactionBlockchainType;
import BlockchainParametersType = ProposalTypes.BlockchainParametersType;
import BlockchainCurrentFeesOperationType = ProposalTypes.BlockchainCurrentFeesOperationType;

export function getBlockchainProposal(props?: Partial<ProposalBlockchainType>): ProposalBlockchainType {
    const blockchainProposal: ProposalBlockchainType = {
        available_active_approvals: ["1.10.5"],
        available_key_approvals: [],
        available_owner_approvals: [],
        expiration_time: "2022-06-16T21:00:00",
        fail_reason: "",
        id: "1.10.0",
        proposed_transaction: {
            expiration: "2022-06-16T21:00:00",
            extensions: [],
            operations: [
                [
                    27,
                    {
                        fee: {
                            amount: 0,
                            asset_id: "1.3.0"
                        },
                        new_parameters: {
                            account_fee_scale_bitshifts: 4,
                            current_fees: {
                                parameters: [],
                                scale: 10000
                            }
                        }
                    }
                ]
            ],
            ref_block_num: 0,
            ref_block_prefix: 0
        },
        proposer: "1.2.6",
        required_active_approvals: ["1.2.0"],
        required_owner_approvals: [],
        review_period_time: "2022-06-16T20:55:00"
    };

    if (undefined !== props) {
        return Object.assign(blockchainProposal, props);
    }

    return blockchainProposal;
}

export function getBlockchainProposalWrongTransactionId() {
    const proposedTransaction: ProposalTransactionBlockchainType = {
        ref_block_num: 10,
        ref_block_prefix: 10,
        expiration: "2022-06-16T21:00:00",
        operations: [
            [
                26,
                {
                    fee: {
                        amount: 0,
                        asset_id: "1.3.0"
                    },
                    new_parameters: {
                        account_fee_scale_bitshifts: 4,
                        current_fees: {
                            parameters: [],
                            scale: 10000
                        }
                    }
                }
            ]
        ],
        extensions: []
    };

    return getBlockchainProposal({
        proposed_transaction: proposedTransaction
    });
}

export function getBlockchainProposalWithParameters(parameters: BlockchainParametersType) {
    const proposedTransaction: ProposalTransactionBlockchainType = {
        ref_block_num: 10,
        ref_block_prefix: 10,
        expiration: "2022-06-16T21:00:00",
        operations: [
            [
                27,
                {
                    fee: {
                        amount: 0,
                        asset_id: "1.3.0"
                    },
                    new_parameters: {
                        ...parameters,
                        current_fees: {
                            parameters: [],
                            scale: 10000
                        }
                    }
                }
            ]
        ],
        extensions: []
    };

    return getBlockchainProposal({
        proposed_transaction: proposedTransaction
    });
}

export function getBlockchainProposalWithOperations(operations: BlockchainCurrentFeesOperationType[]) {
    const parameters: BlockchainParametersType = {
        current_fees: {
            parameters: operations,
            scale: 10000
        }
    };
    const proposedTransaction: ProposalTransactionBlockchainType = {
        ref_block_num: 10,
        ref_block_prefix: 10,
        expiration: "2022-06-16T21:00:00",
        operations: [
            [
                27,
                {
                    fee: {
                        amount: 0,
                        asset_id: "1.3.0"
                    },
                    new_parameters: parameters
                }
            ]
        ],
        extensions: []
    };

    return getBlockchainProposal({
        proposed_transaction: proposedTransaction
    });
}
