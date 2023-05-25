export default class RedeemWithdrawRequest {
    constructor(
        private _contractId: string,
        private _preimage: string,
        private _senderAddress: string,
        private _contractAddress: string,
        private _receiver: string
    ) {}

    get contractId(): string {
        return this._contractId;
    }

    get preimage(): string {
        return this._preimage;
    }

    get senderAddress(): string {
        return this._senderAddress;
    }

    get contractAddress(): string {
        return this._contractAddress;
    }

    get receiver(): string {
        return this._receiver;
    }
}
