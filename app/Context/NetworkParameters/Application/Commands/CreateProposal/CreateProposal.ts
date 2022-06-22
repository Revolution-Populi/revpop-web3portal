import {Moment} from "moment";
import {NetworkParameters} from "../../../types";
import ParametersType = NetworkParameters.ParametersType;

export default class Create {
    constructor(
        private _parameters: ParametersType,
        private _expirationTime: Moment,
        private _reviewPeriod: Moment | null = null
    ) {}

    get parameters(): ParametersType {
        return this._parameters;
    }

    get expirationTime(): Moment {
        return this._expirationTime;
    }

    get reviewPeriod(): Moment | null {
        return this._reviewPeriod;
    }
}
