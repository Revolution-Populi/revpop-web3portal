import {Moment} from "moment";

export default class SubmitDepositRequest {
    constructor(
        private _revpopAccount: string,
        private _value: string,
        private _hashLock: string,
        private _timeLock: Moment
    ) {}

    get revpopAccount(): string {
        return this._revpopAccount;
    }

    get value(): string {
        return this._value;
    }

    get hashLock(): string {
        return this._hashLock;
    }

    get timeLock(): Moment {
        return this._timeLock;
    }
}
