export default class Vote {
    constructor(private _proposalId: string) {}

    get proposalId(): string {
        return this._proposalId;
    }
}
