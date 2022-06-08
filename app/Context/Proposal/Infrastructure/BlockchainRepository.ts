import {Set} from "immutable";
// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";
// @ts-ignore
import {ChainStore} from "@revolutionpopuli/revpopjs";
import RepositoryInterface from "../Domain/RepositoryInterface";
import AccountStore from "../../../stores/AccountStore";
import WalletApi from "../../../api/WalletApi";
import WalletDb from "../../../stores/WalletDb";
import {NetworkParameters} from "../../NetworkParameters/types";
import ProposalType = NetworkParameters.ProposalType;
import ProposalsType = NetworkParameters.ProposalsType;

class BlockchainRepository implements RepositoryInterface {
    private items: ProposalsType = Set();

    async create(proposal: ProposalType): Promise<void> {
        let account = AccountStore.getState().currentAccount;

        account = ChainStore.getAccount(account);

        const transaction = WalletApi.new_transaction();
        transaction.add_type_operation(
            "committee_member_update_global_parameters",
            {
                fee: {
                    amount: 0,
                    asset_id: "1.3.0"
                },
                new_parameters: proposal.parameters
            }
        );

        transaction.propose({
            fee: {
                amount: 1206522,
                asset_id: "1.3.0"
            },
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
        // return {
        //     name: {
        //         id: "1.10.1",
        //         value: "value",
        //         expiration_date: moment().add(3, "day"),
        //         parameters: new OrderedMap({
        //             parameter1: 50,
        //             parameter2: "New value"
        //         })
        //     },
        //     name2: {
        //         id: "1.10.3",
        //         value: "value2",
        //         expiration_date: moment().add(2, "day"),
        //         parameters: new OrderedMap({
        //             parameter1: 100,
        //             parameter2: "New value"
        //         })
        //     }
        // };

        let account = AccountStore.getState().currentAccount;
        account = ChainStore.getAccount(account);

        const data = await Apis.instance()
            .db_api()
            .exec("get_proposed_global_parameters", [account.get("id")]);
        console.log(data);

        const data2 = await Apis.instance()
            .db_api()
            .exec("get_proposed_transactions", [account.get("id")]);

        console.log(data2);
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

        const proposals = Set<ProposalType>();
        return Promise.resolve(proposals);
    }

    async vote(proposal: any) {
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

export default new BlockchainRepository();
