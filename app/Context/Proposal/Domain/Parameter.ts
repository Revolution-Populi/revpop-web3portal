import {ProposalTypes} from "../types";
import ParameterValueType = ProposalTypes.ParameterValueType;

export default class Parameter {
    private _networkValue: ParameterValueType | null = null;
    private _changed = false;
    private _new = false;

    constructor(private _name: string, private _value: ParameterValueType) {}

    get name(): string {
        return this._name;
    }

    get value(): ParameterValueType {
        return this._value;
    }

    get changed(): boolean {
        return this._changed;
    }

    get new(): boolean {
        return this._new;
    }

    set networkValue(newValue: ParameterValueType | null) {
        this._networkValue = newValue;

        if (this.value !== this._networkValue) {
            this._changed = true;
        }
    }

    get networkValue(): ProposalTypes.ParameterValueType | null {
        return this._networkValue;
    }

    markAsNew() {
        this._new = true;
    }

    static create(name: string, value: ParameterValueType) {
        return new Parameter(name, value);
    }
}
