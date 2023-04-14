export default class CreateNewContractRequest {
    constructor(
        private _senderAddress: string,
        private _contractAddress: string,
        private _receiver: string,
        private _amount: string,
        private _hashLock: string,
        private _timeLock: number
    ) {}

    get senderAddress(): string {
        return this._senderAddress;
    }

    get contractAddress(): string {
        return this._contractAddress;
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
