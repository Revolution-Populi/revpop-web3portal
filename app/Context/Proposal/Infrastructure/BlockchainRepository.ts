import RepositoryInterface, {
    Proposal,
    Proposals
} from "../Domain/RepositoryInterface";
// @ts-ignore
import {ChainStore} from "@revolutionpopuli/revpopjs";
import AccountStore from "../../../stores/AccountStore";
import WalletApi from "../../../api/WalletApi";
import WalletDb from "../../../stores/WalletDb";
import {Set} from "immutable";

class BlockchainRepository implements RepositoryInterface {
    private items: Proposals = Set();

    create(proposal: Proposal): void {
        let account = AccountStore.getState().currentAccount;
        account = ChainStore.getAccount(account);

        const transaction = WalletApi.new_transaction();
        transaction.add_type_operation(
            "committee_member_update_global_parameters",
            {
                fee_paying_account: account.get("id"),
                new_parameters: proposal.parameters,
                expiration_time: proposal.expiration_time
            }
        );
        transaction.set_required_fees();

        WalletDb.process_transaction(transaction, null, true);
    }

    loadAll(): Proposals {
        return this.items;
    }
}

export default new BlockchainRepository();

// async create(parameters, expirationTime) {
//     let account = AccountStore.getState().currentAccount;
//     account = ChainStore.getAccount(account);
//
//     const transaction = WalletApi.new_transaction();
//     transaction.add_type_operation(
//         "committee_member_update_global_parameters",
//         {
//             fee_paying_account: account.get("id"),
//             new_parameters: parameters,
//             expiration_time: expirationTime
//         }
//     );
//     transaction.set_required_fees();
//
//     WalletDb.process_transaction(transaction, null, true);
// }
