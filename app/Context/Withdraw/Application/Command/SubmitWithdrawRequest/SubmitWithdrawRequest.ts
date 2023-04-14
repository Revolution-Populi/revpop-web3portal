import Fee from "../../../../Fees/Domain/Fee";

export default class SubmitWithdrawRequest {
    constructor(
        private _revpopAccount: string,
        private _value: string,
        private _transactionFee: Fee,
        private _withdrawalFee: Fee,
        private _hashLock: string,
        private _address: string
    ) {}

    get revpopAccount(): string {
        return this._revpopAccount;
    }

    get value(): string {
        return this._value;
    }

    get transactionFee(): Fee {
        return this._transactionFee;
    }

    get withdrawalFee(): Fee {
        return this._withdrawalFee;
    }

    get hashLock(): string {
        return this._hashLock;
    }

    get address(): string {
        return this._address;
    }
}
