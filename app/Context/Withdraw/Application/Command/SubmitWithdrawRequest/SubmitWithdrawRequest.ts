export default class SubmitWithdrawRequest {
    constructor(
        private _revpopAccount: string,
        private _value: string,
        private _transactionFeeCurrency: string,
        private _withdrawalFeeCurrency: string,
        private _hashLock: string,
        private _address: string
    ) {}

    get revpopAccount(): string {
        return this._revpopAccount;
    }

    get value(): string {
        return this._value;
    }

    get transactionFeeCurrency(): string {
        return this._transactionFeeCurrency;
    }

    get withdrawalFeeCurrency(): string {
        return this._withdrawalFeeCurrency;
    }

    get hashLock(): string {
        return this._hashLock;
    }

    get address(): string {
        return this._address;
    }
}
