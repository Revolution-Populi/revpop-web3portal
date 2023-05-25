export default class DepositContract {
    private _withdrawn = false;
    private _refunded = false;

    constructor(private readonly _txHash: string) {}

    public static create(txHash: string): DepositContract {
        return new DepositContract(txHash);
    }

    get txHash(): string {
        return this._txHash;
    }
}
