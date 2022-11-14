export default class CheckBlockchainContract {
    constructor(private _account: string, private _txHash: string) {}

    get account(): string {
        return this._account;
    }

    get txHash(): string {
        return this._txHash;
    }
}
