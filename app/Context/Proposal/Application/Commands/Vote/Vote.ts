import Proposal from "../../../Domain/Proposal";

export default class Vote {
    constructor(private _proposal: Proposal) {}

    get proposal(): Proposal {
        return this._proposal;
    }
}
