type BlockchainType = "metamask" | "stub";

export default class MakeDeposit {
    constructor(
        private _blockchainType: BlockchainType,
        private _fromAddress: string,
        private _sessionId: string,
        private _revpopAccount: string,
        private _amount: string,
        private _hashLock: string,
        private _timeLock: number
    ) {}

    get blockchainType(): BlockchainType {
        return this._blockchainType;
    }

    get fromAddress(): string {
        return this._fromAddress;
    }

    get sessionId(): string {
        return this._sessionId;
    }

    get revpopAccount(): string {
        return this._revpopAccount;
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
