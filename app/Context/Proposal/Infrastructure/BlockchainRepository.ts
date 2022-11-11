import {Set} from "immutable";
// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";
// @ts-ignore
import {ChainStore} from "@revolutionpopuli/revpopjs";
import RepositoryInterface from "../Domain/RepositoryInterface";
import AccountStore from "../../../stores/AccountStore";
import WalletApi from "../../../api/WalletApi";
import WalletDb from "../../../stores/WalletDb";
import Proposal from "../Domain/Proposal";
import factory from "./Factory";
import {ProposalTypes} from "../types";
import ProposalsType = ProposalTypes.ProposalsType;
import ProposalCreateType = ProposalTypes.ProposalCreateType;

class BlockchainRepository implements RepositoryInterface {
    async create(proposal: ProposalCreateType): Promise<void> {
        let account = AccountStore.getState().currentAccount;
        account = ChainStore.getAccount(account);

        const transaction = proposal.transaction;

        // @ts-ignore
        transaction.propose({
            fee_paying_account: account.get("id"),
            expiration_time: proposal.expirationTime,
            review_period_seconds: proposal.reviewPeriod
        });

        try {
            await WalletDb.process_transaction(transaction, null, true);
        } catch (e) {
            throw new Error("error while sending transaction");
        }
    }

    async loadAll(): Promise<ProposalsType> {
        let account = AccountStore.getState().currentAccount;
        account = ChainStore.getAccount(account);

        const data = await Apis.instance()
            .db_api()
            .exec("get_proposed_global_parameters", [account.get("id")]);

        const proposals = Set<Proposal>().asMutable();

        for (const blockchainProposal of data) {
            proposals.add(
                factory.fromBlockchain(blockchainProposal, account.get("id"))
            );
        }

        return proposals;
    }

    async vote(proposalId: string) {
        let account = AccountStore.getState().currentAccount;
        account = ChainStore.getAccount(account);

        const transaction = WalletApi.new_transaction();
        transaction.add_type_operation("proposal_update", {
            fee_paying_account: account.get("id"),
            proposal: proposalId,
            active_approvals_to_add: [account.get("id")]
        });

        await WalletDb.process_transaction(transaction, null, true);
    }

    async revokeVote(proposalId: string) {
        let account = AccountStore.getState().currentAccount;
        account = ChainStore.getAccount(account);

        console.log("revokeVote", proposalId);

        const transaction = WalletApi.new_transaction();
        transaction.add_type_operation("proposal_update", {
            fee_paying_account: account.get("id"),
            proposal: proposalId,
            active_approvals_to_remove: [account.get("id")]
        });

        await WalletDb.process_transaction(transaction, null, true);
    }
}

export default new BlockchainRepository();
