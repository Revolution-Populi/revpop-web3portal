export default class Fee {
    private _networkValue: number | null = null;
    private _changed = false;

    constructor(private _code: string, private _value: number) {}

    get code(): string {
        return this._code;
    }

    get value(): number {
        return this._value;
    }

    get networkValue(): number | null {
        return this._networkValue;
    }

    setNetworkValue(networkValue: number) {
        this._networkValue = networkValue;

        if (networkValue !== this._value) {
            this._changed = true;
        }
    }

    get changed(): boolean {
        return this._changed;
    }

    static create(code: string, value: number) {
        return new Fee(code, value);
    }
}
