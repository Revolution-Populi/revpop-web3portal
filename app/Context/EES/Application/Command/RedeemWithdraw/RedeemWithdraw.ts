export default class RedeemWithdraw {
    constructor(
        private _contractId: string,
        private _receiverAddress: string,
        private _preimage: string,
        private _sessionId: string
    ) {}

    get contractId(): string {
        return this._contractId;
    }

    get receiverAddress(): string {
        return this._receiverAddress;
    }

    get preimage(): string {
        return this._preimage;
    }

    get sessionId(): string {
        return this._sessionId;
    }
}
