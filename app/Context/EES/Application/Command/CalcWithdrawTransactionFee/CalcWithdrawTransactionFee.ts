import {Map} from "immutable";

export default class CalcWithdrawTransactionFee {
    public constructor(
        private _assetId: string,
        private _account: Map<string, any>
    ) {}

    public get assetId() {
        return this._assetId;
    }
    public get account() {
        return this._account;
    }
}
