import {Set} from "immutable";
import RepositoryInterface from "../Domain/RepositoryInterface";
import Proposal from "../Domain/Proposal";
import {ProposalTypes} from "../types";
import ProposalsType = ProposalTypes.ProposalsType;
import ProposalCreateType = ProposalTypes.ProposalCreateType;
import ProposalsCreateType = ProposalTypes.ProposalsCreateType;

class StubRepository implements RepositoryInterface {
    private _addedItems: ProposalsType = Set<Proposal>().asMutable();
    private _createdItems: ProposalsCreateType = Set<ProposalCreateType>().asMutable();
    private _votedProposalsId: Set<string> = Set<string>().asMutable();
    private _revokeVotedProposalsId: Set<string> = Set<string>().asMutable();

    add(proposal: Proposal) {
        this._addedItems.add(proposal);
    }

    create(proposal: ProposalCreateType): boolean {
        this._createdItems = this._createdItems.add(proposal);

        return true;
    }

    get createdItems(): ProposalsCreateType {
        return this._createdItems;
    }

    loadAll(): Promise<ProposalsType> {
        return Promise.resolve(this._addedItems);
    }

    vote(proposalId: string): void {
        this._votedProposalsId.add(proposalId);
    }

    get votedProposalsId(): Set<string> {
        return this._votedProposalsId;
    }

    revokeVote(proposalId: string): void {
        this._revokeVotedProposalsId.add(proposalId);
    }

    get revokeVotedProposalsId(): Set<string> {
        return this._revokeVotedProposalsId;
    }

    clear() {
        this._addedItems = this._addedItems.clear();
        this._createdItems = this._createdItems.clear();
        this._votedProposalsId.clear();
        this._revokeVotedProposalsId.clear();
    }
}

export default new StubRepository();
