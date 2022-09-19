export default class HTLC {
    constructor(
        private _fromAddress: string,
        private _amount: string,
        private _hashLock: string,
        private _timeLock: number
    ) {}

    get fromAddress(): string {
        return this._fromAddress;
    }

    get amount(): string {
        return this._amount;
    }

    get hashLock(): string {
        return this._hashLock;
    }

    get timeLock(): number {
        return this._timeLock;
    }
}
