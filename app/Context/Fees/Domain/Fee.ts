export default class Fee {
    private _newValue: number | null = null;

    constructor(private _code: string, private _value: number) {}

    get code(): string {
        return this._code;
    }

    get value(): number {
        return this._value;
    }

    get newValue(): number | null {
        return this._newValue;
    }

    get updated(): boolean {
        return null != this.newValue && this.value != this.newValue;
    }

    update(newValue: number) {
        this._newValue = newValue;
    }

    static create(code: string, value: number) {
        return new Fee(code, value);
    }
}
