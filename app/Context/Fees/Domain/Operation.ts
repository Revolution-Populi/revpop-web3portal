import {Map} from "immutable";

type OperationFeesType = Map<string, OperationFeeType>;
type OperationFeeType = number;

export default class Operation {
    private _fees: OperationFeesType = Map();

    constructor(private _id: number, private _name: string) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    addFee(name: string, value: number) {
        this._fees = this._fees.set(name, value);
    }

    get fees(): OperationFeesType {
        return this._fees;
    }
}
