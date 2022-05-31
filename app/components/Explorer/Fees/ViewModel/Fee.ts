import FeeValue from "../../../../Context/Fees/Domain/FeeValue";

export default class Fee {
    constructor(
        private _code: string,
        private _name: string,
        private _standardFee: FeeValue,
        private _lifetimeMemberFee: FeeValue
    ) {}

    get code(): string {
        return this._code;
    }

    get name(): string {
        return this._name?.length > 0 ? this._name : this._code;
    }

    get standardFee(): number {
        return this._standardFee.value;
    }

    get standardFeeNewValue(): number | null {
        return this._standardFee.newValue;
    }

    get lifetimeMemberFee(): number {
        return this._lifetimeMemberFee.value;
    }

    get lifetimeMemberFeeNewValue(): number | null {
        return this._lifetimeMemberFee.newValue;
    }

    updated(): boolean {
        return this._standardFee.updated();
    }
}
