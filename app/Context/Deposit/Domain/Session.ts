import {Either} from "../../Core";
import {PaySessionError} from "./Errors";
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
    private _contract: Contract | null = null;

    constructor(
        private _id: string,
        private _smartContractAddress: string,
        private _receiverAddress: string,
        private _minimumAmount: string,
        private _minimumTimeLock: number
    ) {
        this._status = STATUS.CREATED;
    }

    canBePaid(): boolean {
        return this._status === STATUS.CREATED;
    }

    pay(txHash: string, contract?: Contract): Either<PaySessionError, void> {
        if (!this.canBePaid()) {
            return Failure.create(new PaySessionError(this.id));
        }

        this._txHash = txHash;
        this._contract = contract ?? null;
        this._status = STATUS.PAYED;

        return Success.create(undefined);
    }

    get id(): string {
        return this._id;
    }

    get smartContractAddress(): string {
        return this._smartContractAddress;
    }

    get receiverAddress(): string {
        return this._receiverAddress;
    }

    get minimumAmount(): string {
        return this._minimumAmount;
    }

    get minimumTimeLock(): number {
        return this._minimumTimeLock;
    }

    get txHash(): string | null {
        return this._txHash;
    }

    get contract(): Contract | null {
        return this._contract;
    }

    get status(): STATUS {
        return this._status;
    }
}
