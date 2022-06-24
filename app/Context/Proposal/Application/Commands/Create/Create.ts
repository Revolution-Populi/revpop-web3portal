import {Moment} from "moment";

export default class Create {
    constructor(private _transaction: unknown, private _expirationTime: Moment, private _reviewPeriod: number) {}

    get transaction(): unknown {
        return this._transaction;
    }

    get expirationTime(): Moment {
        return this._expirationTime;
    }

    get reviewPeriod(): number {
        return this._reviewPeriod;
    }
}
