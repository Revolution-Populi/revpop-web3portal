import {ProposalTypes} from "../types";
import ParameterValueType = ProposalTypes.ParameterValueType;

export default class Parameter {
    private _newValue: ParameterValueType | null = null;

    constructor(private _name: string, private _value: ParameterValueType) {}

    get name(): string {
        return this._name;
    }

    get value(): ParameterValueType {
        return this._value;
    }

    static create(name: string, value: ParameterValueType) {
        return new Parameter(name, value);
    }
}
