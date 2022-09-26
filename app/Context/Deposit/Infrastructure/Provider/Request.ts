export default class Request {
    constructor(
        private _contractAddress: string,
        private _receiver: string,
        private _fromAddress: string,
        private _amount: string,
        private _hashLock: string,
        private _timeLock: number
    ) {}

    get contractAddress(): string {
        return this._contractAddress;
    }

    get receiver(): string {
        return this._receiver;
    }

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
