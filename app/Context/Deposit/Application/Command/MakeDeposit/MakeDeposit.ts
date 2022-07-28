type BlockchainType = "metamask";

export default class MakeDeposit {
    constructor(
        private _blockchainType: BlockchainType,
        private _fromAddress: string,
        private _toAccount: string,
        private _amount: string,
        private _hash: string,
        private _timeout: number
    ) {}

    get blockchainType(): BlockchainType {
        return this._blockchainType;
    }

    get fromAddress(): string {
        return this._fromAddress;
    }

    get toAccount(): string {
        return this._toAccount;
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
