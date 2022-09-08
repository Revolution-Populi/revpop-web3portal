import {ProposalTypes} from "../../../../Context/Proposal/types";

export default class Parameter {
    constructor(
        private _code: string,
        private _value: ProposalTypes.ParameterValueType,
        private _networkValue: ProposalTypes.ParameterValueType | null,
        private _changed: boolean,
        private _new: boolean,
        private _description?: string
    ) {}

    get code(): string {
        return this._code;
    }

    get value(): ProposalTypes.ParameterValueType {
        return this._value;
    }

    get networkValue(): ProposalTypes.ParameterValueType | null {
        return this._networkValue;
    }

    get changed(): boolean {
        return this._changed;
    }

    get new(): boolean {
        return this._new;
    }

    static create(
        code: string,
        value: ProposalTypes.ParameterValueType,
        networkValue: ProposalTypes.ParameterValueType | null,
        changed: boolean,
        isNew: boolean
    ) {
        return new Parameter(code, value, networkValue, changed, isNew);
    }
}
