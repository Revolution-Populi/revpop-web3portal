import {Moment} from "moment";
import {SessionWrongStatusError} from "./Errors";
import ExternalContract from "./ExternalBlockchain/Contract";
import InternalContract from "./InternalBlockchain/Contract";

export enum STATUS {
    CREATED = 1,
    PAYED = 5,
    CREATED_INTERNAL_BLOCKCHAIN = 10,
    REDEEMED = 15
}

export default class Session {
    private _status: STATUS;
    private _externalContract: ExternalContract | null = null;
    private _internalContract: InternalContract | null = null;

    constructor(
        private _id: string,
        private _internalAccount: string,
        private _value: string,
        private _hashLock: string,
        private _address: string
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

    get address(): string {
        return this._address;
    }

    get status(): number {
        return this._status;
    }

    get externalContract(): ExternalContract | null {
        return this._externalContract;
    }

    get internalContract(): InternalContract | null {
        return this._internalContract;
    }

    isCreated(): boolean {
        return this._status === STATUS.CREATED;
    }

    isPaid(): boolean {
        return this._status === STATUS.PAYED;
    }

    isCreatedInternalBlockchain(): boolean {
        return this._status === STATUS.CREATED_INTERNAL_BLOCKCHAIN;
    }

    isRedeemed(): boolean {
        return this._status === STATUS.REDEEMED;
    }

    pay(externalContract: ExternalContract) {
        if (!this.isCreated()) {
            throw new SessionWrongStatusError(
                this._id,
                "Can't change status to payed."
            );
        }

        this._externalContract = externalContract;
        this._status = STATUS.PAYED;
    }

    createdInternalBlockchain(internalContract: InternalContract) {
        if (!this.isPaid()) {
            throw new SessionWrongStatusError(
                this._id,
                "Can't approve internal contract creation."
            );
        }

        this._internalContract = internalContract;
        this._status = STATUS.CREATED_INTERNAL_BLOCKCHAIN;
    }

    static create(
        id: string,
        internalAccount: string,
        value: string,
        hashLock: string,
        address: string
    ) {
        return new Session(id, internalAccount, value, hashLock, address);
    }
}
