import RepositoryInterface from "../Domain/RepositoryInterface";
import {Set} from "immutable";
import {NetworkParameters} from "../../NetworkParameters/types";
import ProposalType = NetworkParameters.ProposalType;
import ProposalsType = NetworkParameters.ProposalsType;

class StubRepository implements RepositoryInterface {
    private items: ProposalsType = Set();

    create(proposal: ProposalType): boolean {
        this.items = this.items.add(proposal);

        return true;
    }

    loadAll(): Promise<ProposalsType> {
        return Promise.resolve(this.items);
    }

    clear() {
        this.items = this.items.clear();
    }
}

export default new StubRepository();
