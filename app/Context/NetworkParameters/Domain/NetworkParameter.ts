import {Map} from "immutable";

export type ParameterValueType = string | number | boolean;

export default class NetworkParameter {
    private _value: ParameterValueType | null = null;
    private _newValue: ParameterValueType | null = null;
    private _modified = false;
    private _link: string | null = null;
    private _children: Map<string, NetworkParameter> = Map();

    constructor(private _name: string) {}

    get name(): string {
        return this._name;
    }

    set value(value) {
        this._value = value;
    }

    get value(): ParameterValueType | null {
        return this._value;
    }

    get newValue(): ParameterValueType | null {
        return this._newValue;
    }

    set newValue(value: ParameterValueType | null) {
        this._newValue = value;
        this._modified = true;
    }

    get link(): string | null {
        return this._link;
    }

    set link(value: string | null) {
        this._link = value;
    }

    get children(): Map<string, NetworkParameter> {
        return this._children;
    }

    set children(value: Map<string, NetworkParameter>) {
        this._children = value;
    }

    public isNormal() {
        return this.value !== null && this._children.size == 0;
    }

    public isLink() {
        return this.link !== null;
    }

    public isGroup() {
        return this._children.size > 0;
    }
}
