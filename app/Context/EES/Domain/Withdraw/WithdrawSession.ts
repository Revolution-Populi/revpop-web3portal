import {SessionWrongStatusError} from "../Errors";
import ExternalContract from "../ExternalBlockchain/WithdrawContract";
import InternalContract from "../InternalBlockchain/Contract";

export enum STATUS {
    CREATED = 1,
    SUBMITTED_TO_INTERNAL_BLOCKCHAIN = 5,
    READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN = 10,
    REDEEMED = 15
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

    isReadyToSignInExternalBlockchain(): boolean {
        return this._status === STATUS.READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN;
    }

    isRedeemed(): boolean {
        return this._status === STATUS.REDEEMED;
    }

    failedSubmittedInInternalBlockchain() {
        if (!this.isSubmitted()) {
            throw new SessionWrongStatusError(
                this._id,
                "Can't restore created status."
            );
        }

        this._status = STATUS.CREATED;
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

    readyToSignInExternalBlockchain(externalContract: ExternalContract) {
        if (!this.isSubmitted()) {
            throw new SessionWrongStatusError(
                this._id,
                "Can't approve ready to sign."
            );
        }

        this._externalContract = externalContract;
        this._status = STATUS.READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN;
    }

    redeem(txHash: string) {
        if (this._externalContract) {
            this._externalContract.txHash = txHash;
        }

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
