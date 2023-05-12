type BlockchainType = "metamask" | "stub";

export default class MakeDeposit {
    constructor(
        private _blockchainType: BlockchainType,
        private _senderAddress: string,
        private _sessionId: string
    ) {}

    get blockchainType(): BlockchainType {
        return this._blockchainType;
    }

    get senderAddress(): string {
        return this._senderAddress;
    }

    get sessionId(): string {
        return this._sessionId;
    }
}
