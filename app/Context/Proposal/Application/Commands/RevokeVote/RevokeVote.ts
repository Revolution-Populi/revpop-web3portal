export default class RevokeVote {
    constructor(private _proposalId: string) {}

    get proposalId(): string {
        return this._proposalId;
    }
}
