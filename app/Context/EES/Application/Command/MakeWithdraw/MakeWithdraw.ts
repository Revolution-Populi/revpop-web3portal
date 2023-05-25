export default class MakeWithdraw {
    constructor(private _sessionId: string) {}

    get sessionId(): string {
        return this._sessionId;
    }
}
