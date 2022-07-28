import {ProposalTypes} from "../../../types";
import ProposalsType = ProposalTypes.ProposalsType;

export default class Vote {
    constructor(
        private _proposals: ProposalsType,
        private _proposalId: string
    ) {}

    get proposals(): ProposalsType {
        return this._proposals;
    }

    get proposalId(): string {
        return this._proposalId;
    }
}
