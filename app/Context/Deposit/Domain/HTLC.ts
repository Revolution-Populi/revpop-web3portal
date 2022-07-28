export default class HTLC {
    constructor(
        private _fromAddress: string,
        private _amount: string,
        private _hash: string,
        private _timeout: number
    ) {}

    get fromAddress(): string {
        return this._fromAddress;
    }

    get amount(): string {
        return this._amount;
    }

    get hash(): string {
        return this._hash;
    }

    get timeout(): number {
        return this._timeout;
    }
}
