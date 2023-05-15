export default class SubmitWithdrawRequest {
    constructor(
        private _revpopAccount: string,
        private _value: string,
        private _withdrawalFeeCurrency: string,
        private _transactionFeeCurrency: string,
        private _hashLock: string,
        private _ethereumAddress: string
    ) {}

    get revpopAccount(): string {
        return this._revpopAccount;
    }

    get value(): string {
        return this._value;
    }

    get withdrawalFeeCurrency(): string {
        return this._withdrawalFeeCurrency;
    }

    get transactionFeeCurrency(): string {
        return this._transactionFeeCurrency;
    }

    get hashLock(): string {
        return this._hashLock;
    }

    get ethereumAddress(): string {
        return this._ethereumAddress;
    }
}
