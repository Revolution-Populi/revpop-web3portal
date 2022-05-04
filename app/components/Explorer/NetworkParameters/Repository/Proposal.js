import {Apis} from "@revolutionpopuli/revpopjs-ws";
import {ChainStore} from "@revolutionpopuli/revpopjs";
import AccountStore from "../../../../stores/AccountStore";
import WalletDb from "../../../../stores/WalletDb";
import WalletApi from "../../../../api/WalletApi";
import {OrderedMap} from "immutable";
import moment from "moment";

class ProposalRepository {
    async load() {
        return {
            name: {
                id: "1.10.1",
                value: "value",
                expiration_date: moment().add(3, "day"),
                parameters: new OrderedMap({
                    parameter1: 50,
                    parameter2: "New value"
                })
            },
            name2: {
                id: "1.10.3",
                value: "value2",
                expiration_date: moment().add(2, "day"),
                parameters: new OrderedMap({
                    parameter1: 100,
                    parameter2: "New value"
                })
            }
        };

        // let account = AccountStore.getState().currentAccount;
        // account = ChainStore.getAccount(account);
        //
        // const data = (
        //     await Apis.instance()
        //         .db_api()
        //         .exec("get_proposed_transactions", [
        //             account.get("id")
        //         ])
        // );
        // const parametersKeys = Object.keys(data);
        // const parameters = {};
        //
        // parametersKeys.map(name => {
        //     parameters[name] = {
        //         name,
        //         value: data[name]
        //     };
        // });
        //
        // return parameters;
    }

    async create(parameters, expirationTime) {
        let account = AccountStore.getState().currentAccount;
        account = ChainStore.getAccount(account);

        const transaction = WalletApi.new_transaction();
        transaction.add_type_operation(
            "committee_member_update_global_parameters",
            {
                fee_paying_account: account.get("id"),
                new_parameters: parameters,
                expiration_time: expirationTime
            }
        );
        transaction.set_required_fees();

        WalletDb.process_transaction(transaction, null, true);
    }

    async vote(proposal) {
        let account = AccountStore.getState().currentAccount;
        account = ChainStore.getAccount(account);

        const transaction = WalletApi.new_transaction();
        transaction.add_type_operation("proposal_update", {
            fee_paying_account: account.get("id"),
            proposal: proposal.id,
            active_approvals_to_add: [account.get("id")]
        });

        await WalletDb.process_transaction(transaction, null, true);
    }
}

export default new ProposalRepository();
