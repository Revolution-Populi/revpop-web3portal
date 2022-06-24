import NetworkParameter, {
    ParameterValueType
} from "../../../Domain/NetworkParameter";
import {Map} from "immutable";

export default class UpdateParameter {
    constructor(
        private _parameters: Map<string, NetworkParameter>,
        private _key: string,
        private _newValue: ParameterValueType
    ) {}

    get parameters(): Map<string, NetworkParameter> {
        return this._parameters;
    }

    get key(): string {
        return this._key;
    }

    get newValue(): ParameterValueType {
        return this._newValue;
    }
}
