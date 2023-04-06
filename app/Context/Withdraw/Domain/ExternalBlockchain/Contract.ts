export default class Contract {
    private _withdrawn = false;
    private _refunded = false;

    constructor(private readonly _txHash: string) {}

    public static create(txHash: string): Contract {
        return new Contract(txHash);
    }

    get txHash(): string {
        return this._txHash;
    }
}
