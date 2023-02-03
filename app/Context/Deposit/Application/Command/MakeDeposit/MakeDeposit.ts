type BlockchainType = "metamask" | "stub";

export default class MakeDeposit {
    constructor(
        private _blockchainType: BlockchainType,
        private _sessionId: string
    ) {}

    get blockchainType(): BlockchainType {
        return this._blockchainType;
    }

    get sessionId(): string {
        return this._sessionId;
    }
}
