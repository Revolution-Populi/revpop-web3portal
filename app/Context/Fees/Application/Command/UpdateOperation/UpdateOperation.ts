import {Fees} from "../../../types";
import Operations = Fees.OperationsType;

export default class UpdateOperation {
    constructor(
        private _operations: Operations,
        private _id: number,
        private _feeCode: string,
        private _value: number
    ) {}

    get operations(): Fees.OperationsType {
        return this._operations;
    }

    get id(): number {
        return this._id;
    }

    get feeCode(): string {
        return this._feeCode;
    }

    get value(): number {
        return this._value;
    }
}
