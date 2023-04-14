export default class CheckDepositContractCreated {
    constructor(private _sessionId: string) {}

    get sessionId(): string {
        return this._sessionId;
    }
}
