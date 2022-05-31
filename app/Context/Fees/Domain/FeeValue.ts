export default class FeeValue {
    constructor(private _value: number, private _newValue: number | null) {}

    get value(): number {
        return this._value;
    }

    get newValue(): number | null {
        return this._newValue;
    }

    updated(): boolean {
        return null != this._newValue && this._newValue != this._value;
    }

    public static create(value: number, newValue: number | null) {
        return new FeeValue(value, newValue);
    }
}
