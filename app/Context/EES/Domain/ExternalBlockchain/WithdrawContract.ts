export default class WithdrawContract {
    public txHash: string | null = null;
    constructor(private readonly _id: string) {}

    public static create(id: string): WithdrawContract {
        return new WithdrawContract(id);
    }

    get id(): string {
        return this._id;
    }
}
