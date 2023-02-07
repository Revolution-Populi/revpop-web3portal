import {Moment} from "moment";
import {SessionCanNotBePayed} from "./Errors";
import ExternalContract from "./ExternalBlockchain/Contract";

export enum STATUS {
    CREATED = 1,
    PAYED = 5,
    REDEEMED = 10
}

export default class Session {
    private _status: STATUS;
    private _externalContract: ExternalContract | null = null;

    constructor(
        private _id: string,
        private _internalAccount: string,
        private _value: string,
        private _hashLock: string,
        private _timeLock: Moment
    ) {
        this._status = STATUS.CREATED;
    }

    get id(): string {
        return this._id;
    }

    get internalAccount(): string {
        return this._internalAccount;
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

    get externalContract(): ExternalContract | null {
        return this._externalContract;
    }

    isCreated(): boolean {
        return this._status === STATUS.CREATED;
    }

    isPaid(): boolean {
        return this._status === STATUS.PAYED;
    }

    pay(externalContract: ExternalContract) {
        if (!this.isCreated()) {
            throw new SessionCanNotBePayed(this._id);
        }

        this._externalContract = externalContract;
        this._status = STATUS.PAYED;
    }

    static create(
        id: string,
        internalAccount: string,
        value: string,
        hashLock: string,
        timeLock: Moment
    ) {
        return new Session(id, internalAccount, value, hashLock, timeLock);
    }
}
