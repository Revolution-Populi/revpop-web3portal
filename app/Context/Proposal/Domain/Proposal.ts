import {ParameterObjectValueType} from "../../NetworkParameters/Domain/RepositoryInterface";

export default class Proposal {
    constructor(
        private _parameters: ParameterObjectValueType,
        private _expirationDate: Date
    ) {}

    get parameters(): ParameterObjectValueType {
        return this._parameters;
    }

    get expirationDate(): Date {
        return this._expirationDate;
    }
}
