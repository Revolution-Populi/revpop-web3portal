export default class GetWithdrawSession {
    constructor(private _sessionId: string) {}

    get sessionId(): string {
        return this._sessionId;
    }
}
