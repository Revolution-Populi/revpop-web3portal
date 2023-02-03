export default class Contract {
    private _withdrawn = false;
    private _refunded = false;

    constructor(
        private _sender: string,
        private _receiver: string,
        private _amount: string,
        private _hashLock: string,
        private _timeLock: number
    ) {}

    get sender(): string {
        return this._sender;
    }

    get receiver(): string {
        return this._receiver;
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
