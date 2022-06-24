export default class Fee {
    constructor(
        private _code: string,
        private _changed: boolean,
        private _value: number,
        private _networkValue: number | null
    ) {}

    get code(): string {
        return this._code;
    }

    get changed(): boolean {
        return this._changed;
    }

    get value(): number {
        return this._value;
    }

    get networkValue(): number | null {
        return this._networkValue;
    }

    static create(code: string, changed: boolean, value: number, newValue: number | null) {
        return new Fee(code, changed, value, newValue);
    }
}
