import {SessionWrongStatusError} from "../Errors";
import ExternalContract from "../ExternalBlockchain/Contract";
import InternalContract from "../InternalBlockchain/Contract";

export enum STATUS {
    CREATED = 1,
    SUBMITTED_TO_INTERNAL_BLOCKCHAIN = 5,
    CREATED_INTERNAL_BLOCKCHAIN = 10,
    PAYED = 15,
    REDEEMED = 20
}

export default class WithdrawSession {
    private _status: STATUS;
    private _externalContract: ExternalContract | null = null;
    private _internalContract: InternalContract | null = null;

    constructor(
        private _id: string,
        private _internalAccountName: string,
        private _value: number,
        private _hashLock: string,
        private _withdrawalFeeCurrency: string,
        private _withdrawalFeeAmount: number,
        private _transactionFeeCurrency: string,
        private _transactionFeeAmount: number,
        private _ethereumAddress: string
    ) {
        this._status = STATUS.CREATED;
    }

    get id(): string {
        return this._id;
    }

    get internalAccountName(): string {
        return this._internalAccountName;
    }

    get value(): number {
        return this._value;
    }

    get hashLock(): string {
        return this._hashLock;
    }

    get withdrawalFeeCurrency(): string {
        return this._withdrawalFeeCurrency;
    }

    get withdrawalFeeAmount(): number {
        return this._withdrawalFeeAmount;
    }

    get transactionFeeCurrency(): string {
        return this._transactionFeeCurrency;
    }

    get transactionFeeAmount(): number {
        return this._transactionFeeAmount;
    }

    get ethereumAddress(): string {
        return this._ethereumAddress;
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

    isSubmitted(): boolean {
        return this._status === STATUS.SUBMITTED_TO_INTERNAL_BLOCKCHAIN;
    }

    isCreatedInternalBlockchain(): boolean {
        return this._status === STATUS.CREATED_INTERNAL_BLOCKCHAIN;
    }

    isPaid(): boolean {
        return this._status === STATUS.PAYED;
    }

    isRedeemed(): boolean {
        return this._status === STATUS.REDEEMED;
    }

    submittedInInternalBlockchain() {
        if (!this.isCreated()) {
            throw new SessionWrongStatusError(
                this._id,
                "Can't approve submitted."
            );
        }

        this._status = STATUS.SUBMITTED_TO_INTERNAL_BLOCKCHAIN;
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

    redeemed() {
        this._status = STATUS.REDEEMED;
    }

    static create(
        id: string,
        internalAccount: string,
        value: number,
        hashLock: string,
        withdrawalFeeCurrency: string,
        withdrawalFeeAmount: number,
        transactionFeeCurrency: string,
        transactionFeeAmount: number,
        ethereumAddress: string
    ) {
        return new WithdrawSession(
            id,
            internalAccount,
            value,
            hashLock,
            withdrawalFeeCurrency,
            withdrawalFeeAmount,
            transactionFeeCurrency,
            transactionFeeAmount,
            ethereumAddress
        );
    }
}
