import {Either, left, Result, right} from "../../Core";
import {PaySessionError} from "./Errors";

enum STATUS {
    CREATED = 1,
    PAYED = 5,
    REDEEMED = 10
}

export default class Session {
    private _status: STATUS;
    private _txHash: string | null = null;

    constructor(
        private _id: string,
        private _smartContractAddress: string,
        private _receiverAddress: string,
        private _timeLock: number
    ) {
        this._status = STATUS.CREATED;
    }

    canBePaid(): boolean {
        return this._status === STATUS.CREATED;
    }

    pay(txHash: string): Either<PaySessionError, Result<void>> {
        if (this._status !== STATUS.CREATED) {
            return left(new PaySessionError(this.id));
        }

        this._txHash = txHash;
        this._status = STATUS.PAYED;

        return right(Result.ok<void>());
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

    get timeLock(): number {
        return this._timeLock;
    }

    get status(): STATUS {
        return this._status;
    }
}
