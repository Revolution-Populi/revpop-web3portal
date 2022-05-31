import {Map} from "immutable";
import Fee from "./Fee";
import {Fees} from "../types";
import OperationFeesType = Fees.OperationFeesType;

export default class Operation {
    private _fees: OperationFeesType = Map();

    constructor(private _id: number, private _name: string) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    addFee(code: string, value: number) {
        this._fees = this._fees.set(code, new Fee(code, value));
    }

    get fees(): OperationFeesType {
        return this._fees;
    }

    get updated(): boolean {
        return false;
    }

    getFee(code: string): Fee {
        if (!this.fees.has(code)) {
            throw new Error(`fee ${code} not found`);
        }

        return this.fees.get(code);
    }

    updateFee(code: string, newValue: number) {
        const fee = this.getFee(code);
        fee.update(newValue);
    }
}
