export default class SubmitDepositRequest {
    constructor(private _revpopAccount: string, private _hashLock: string) {}

    get revpopAccount(): string {
        return this._revpopAccount;
    }

    get hashLock(): string {
        return this._hashLock;
    }
}
