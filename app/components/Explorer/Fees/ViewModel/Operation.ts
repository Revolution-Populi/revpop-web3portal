import Fee from "./Fee";
import {OrderedSet} from "immutable";

export default class Operation {
    private _fees: OrderedSet<Fee> = OrderedSet<Fee>().asMutable();

    constructor(
        private _id: number,
        private _code: string,
        private _name: string
    ) {}

    get id(): number {
        return this._id;
    }

    get code(): string {
        return this._code;
    }

    get name(): string {
        return this._name?.length > 0 ? this._name : this._code;
    }

    addFee(fee: Fee) {
        this._fees.add(fee);
    }

    get fees(): OrderedSet<Fee> {
        return this._fees;
    }
}
