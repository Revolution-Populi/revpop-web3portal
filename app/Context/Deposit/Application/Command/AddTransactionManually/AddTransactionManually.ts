export default class AddTransactionManually {
    constructor(private _sessionId: string, private _txHash: string) {}

    get sessionId(): string {
        return this._sessionId;
    }

    get txHash(): string {
        return this._txHash;
    }
}
