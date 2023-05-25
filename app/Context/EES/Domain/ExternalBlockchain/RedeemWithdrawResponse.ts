export default class RedeemWithdrawResponse {
    constructor(private _success: boolean, private _txHash: string) {}

    get success(): boolean {
        return this._success;
    }

    get txHash(): string {
        return this._txHash;
    }
}
