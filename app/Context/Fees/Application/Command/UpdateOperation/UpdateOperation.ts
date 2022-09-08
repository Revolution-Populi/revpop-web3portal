import Operation from "../../../Domain/Operation";

export default class UpdateOperation {
    constructor(
        private _operation: Operation,
        private _feeCode: string,
        private _value: number
    ) {}

    get operation(): Operation {
        return this._operation;
    }

    get feeCode(): string {
        return this._feeCode;
    }

    get value(): number {
        return this._value;
    }
}
