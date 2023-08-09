export default class TokenDistributionRequest {
    constructor(private _revpopAccount: string, private _phrase: string) {}

    get revpopAccount(): string {
        return this._revpopAccount;
    }

    get phrase(): string {
        return this._phrase;
    }
}
