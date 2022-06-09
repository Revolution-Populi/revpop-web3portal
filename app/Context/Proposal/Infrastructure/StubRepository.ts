import RepositoryInterface from "../Domain/RepositoryInterface";
import {Set} from "immutable";
import {NetworkParameters} from "../../NetworkParameters/types";
import ProposalType = NetworkParameters.ProposalType;
import ProposalsType = NetworkParameters.ProposalsType;
import {ProposalTypes} from "../types";
import ProposalBlockchainType = ProposalTypes.ProposalBlockchainType;
import ProposalsBlockchainType = ProposalTypes.ProposalsBlockchainType;

class StubRepository implements RepositoryInterface {
    private _items: ProposalsType = Set();
    private blockchainItems: ProposalsBlockchainType = [];

    create(proposal: ProposalType): boolean {
        this._items = this._items.add(proposal);

        return true;
    }

    loadAll(): Promise<ProposalsType> {
        return Promise.resolve(this._items);
    }

    vote(proposalId: string): void {
        console.log("vote", proposalId);
    }

    revokeVote(proposalId: string): void {
        console.log("revokeVote", proposalId);
    }

    get items(): ProposalsType {
        return this._items;
    }

    addBlockchainItem(blockchainItem: ProposalBlockchainType) {
        this.blockchainItems.push(blockchainItem);
    }

    clear() {
        this._items = this._items.clear();
    }
}

export default new StubRepository();
