export default class ConfirmSession {
    constructor(
        private _sessionId: string,
        private _txHash: string,
        private _revpopAccount: string,
        private _hashLock: string
    ) {}

    get sessionId(): string {
        return this._sessionId;
    }

    get txHash(): string {
        return this._txHash;
    }

    get revpopAccount(): string {
        return this._revpopAccount;
    }

    get hashLock(): string {
        return this._hashLock;
    }
}
