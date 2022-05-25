import Fee from "./Fee";
import {Set} from "immutable";

export default class Operation {
    private _fees: Set<Fee> = Set<Fee>().asMutable();

    constructor(private _id: number, private _code: string) {}

    get id(): number {
        return this._id;
    }

    get code(): string {
        return this._code;
    }

    addFee(fee: Fee) {
        this._fees.add(fee);
    }

    get fees(): Set<Fee> {
        return this._fees;
    }
}
