import {Moment} from "moment";
import {Fees} from "../../../types";
import OperationsType = Fees.OperationsType;

export default class Create {
    constructor(
        private _operations: OperationsType,
        private _expirationTime: Moment,
        private _reviewPeriod: Moment | null = null
    ) {}

    get operations(): OperationsType {
        return this._operations;
    }

    get expirationTime(): Moment {
        return this._expirationTime;
    }

    get reviewPeriod(): Moment | null {
        return this._reviewPeriod;
    }
}
