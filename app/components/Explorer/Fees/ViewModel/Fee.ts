export default class Fee {
    constructor(
        private _name: string,
        private _standardFee: number,
        private _lifetimeMemberFee: number
    ) {}

    get name(): string {
        return this._name;
    }

    get standardFee(): number {
        return this._standardFee;
    }

    get lifetimeMemberFee(): number {
        return this._lifetimeMemberFee;
    }
}
