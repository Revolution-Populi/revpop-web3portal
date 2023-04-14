export default class CreateHtlcResponse {
    constructor(private status: boolean, private _txHash: string) {}

    isSuccess() {
        return this.status;
    }

    get txHash(): string {
        return this._txHash;
    }
}
