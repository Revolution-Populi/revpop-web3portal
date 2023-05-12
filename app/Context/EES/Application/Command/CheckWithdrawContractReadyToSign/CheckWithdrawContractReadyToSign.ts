export default class CheckWithdrawContractReadyToSign {
    constructor(private _sessionId: string) {}

    get sessionId(): string {
        return this._sessionId;
    }
}
