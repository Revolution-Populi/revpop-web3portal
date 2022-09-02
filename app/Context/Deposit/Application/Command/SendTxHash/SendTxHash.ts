export default class SendTxHash {
    constructor(
        private _txHash: string,
        private _revpopAccount: string,
        private _hashLock: string
    ) {}

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
