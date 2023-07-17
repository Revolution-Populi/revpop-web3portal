import {Moment} from "moment";
import {SessionWrongStatusError} from "../Errors";
import ExternalContract from "../ExternalBlockchain/DepositContract";
import InternalContract from "../InternalBlockchain/Contract";

export enum STATUS {
    CREATED = 1,
    PAID = 5,
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

    get internalContract(): InternalContract | null {
        return this._internalContract;
    }

    isCreated(): boolean {
        return this._status === STATUS.CREATED;
    }

    isPaid(): boolean {
        return this._status === STATUS.PAID;
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
                "Can't change status to paid."
            );
        }

        this._externalContract = externalContract;
        this._status = STATUS.PAID;
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

    redeemed() {
        // if (!this.isCreatedInternalBlockchain()) {
        //     throw new SessionWrongStatusError(
        //         this._id,
        //         "Can't redeem internal contract."
        //     );
        // }

        this._status = STATUS.REDEEMED;
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
