import RepositoryInterface, {
    Proposal,
    Proposals
} from "../Domain/RepositoryInterface";
import {Set} from "immutable";

class StubRepository implements RepositoryInterface {
    private items: Proposals = Set();

    create(proposal: Proposal): boolean {
        this.items = this.items.add(proposal);

        return true;
    }

    loadAll(): Proposals {
        return this.items;
    }

    clear() {
        this.items = this.items.clear();
    }
}

export default new StubRepository();
