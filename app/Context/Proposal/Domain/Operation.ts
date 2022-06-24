import Fee from "./Fee";

export default class Operation {
    constructor(private _id: number, private _fees: Fee[]) {}

    get id(): number {
        return this._id;
    }

    get changed(): boolean {
        return this.fees.find(fee => fee.changed) !== undefined;
    }

    get fees(): Fee[] {
        return this._fees;
    }

    static create(id: number, fees: Fee[]) {
        return new Operation(id, fees);
    }
}
