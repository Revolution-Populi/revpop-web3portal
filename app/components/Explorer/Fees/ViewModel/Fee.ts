export default class Fee {
    constructor(
        private _code: string,
        private _name: string,
        private _standardFee: number,
        private _lifetimeMemberFee: number
    ) {}

    get code(): string {
        return this._code;
    }

    get name(): string {
        return this._name?.length > 0 ? this._name : this._code;
    }

    get standardFee(): number {
        return this._standardFee;
    }

    get lifetimeMemberFee(): number {
        return this._lifetimeMemberFee;
    }

    isFreeStandardFee(): boolean {
        return this._standardFee == 0;
    }
}
