export default class SendTxHash {
    constructor(private _txHash: string) {}

    get txHash(): string {
        return this._txHash;
    }
}
