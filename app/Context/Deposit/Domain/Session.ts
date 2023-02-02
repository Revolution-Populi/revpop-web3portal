import {Moment} from "moment";
import {SessionCanNotBePayed} from "./Errors";
import {Failure, Success} from "../../Core/Logic/Result";
import Contract from "./Contract";

export enum STATUS {
    CREATED = 1,
    PAYED = 5,
    REDEEMED = 10
}

export default class Session {
    private _status: STATUS;
    private _txHash: string | null = null;

    constructor(
        private _id: string,
        private _value: string,
        private _hashLock: string,
        private _timeLock: Moment
    ) {
        this._status = STATUS.CREATED;
    }

    get id(): string {
        return this._id;
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

    get status(): number {
        return this._status;
    }

    canBePaid(): boolean {
        return this._status === STATUS.CREATED;
    }

    isPaid(): boolean {
        return this._status === STATUS.PAYED;
    }

    pay(txHash: string, contract?: Contract) {
        if (!this.canBePaid()) {
            throw new SessionCanNotBePayed(this._id);
        }

        this._txHash = txHash;
        this._status = STATUS.PAYED;

        return Success.create(undefined);
    }

    static create(
        id: string,
        value: string,
        hashLock: string,
        timeLock: Moment
    ) {
        return new Session(id, value, hashLock, timeLock);
    }
}
