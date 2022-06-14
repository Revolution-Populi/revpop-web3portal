import {Set} from "immutable";
import RepositoryInterface from "../Domain/RepositoryInterface";
import Proposal from "../Domain/Proposal";
import {ProposalTypes} from "../types";
import ProposalsType = ProposalTypes.ProposalsType;
//TODO::remove dependency from NetworkParameters
import {NetworkParameters} from "../../NetworkParameters/types";
import NetworkParametersProposalType = NetworkParameters.ProposalType;
import NetworkParametersProposalsType = NetworkParameters.ProposalsType;

class StubRepository implements RepositoryInterface {
    private _addedItems: ProposalsType = Set<Proposal>().asMutable();
    private _createdItems: NetworkParametersProposalsType = Set().asMutable();
    private _votedProposalsId: Set<string> = Set<string>().asMutable();
    private _revokeVotedProposalsId: Set<string> = Set<string>().asMutable();

    add(proposal: Proposal) {
        this._addedItems.add(proposal);
    }

    create(proposal: NetworkParametersProposalType): boolean {
        this._createdItems = this._createdItems.add(proposal);

        return true;
    }

    get createdItems(): NetworkParametersProposalsType {
        return this._createdItems;
    }

    loadAll(): Promise<ProposalsType> {
        return Promise.resolve(this._createdItems);
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
        this._createdItems = this._createdItems.clear();
        this._votedProposalsId.clear();
        this._revokeVotedProposalsId.clear();
    }
}

export default new StubRepository();
