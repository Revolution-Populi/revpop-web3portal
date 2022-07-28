import moment from "moment";
//TODO::remove dependency from NetworkParameters
import {NetworkParameters} from "../../../../NetworkParameters/types";

export default class Create {
    constructor(
        private _parameters: NetworkParameters.ParametersType,
        private _expirationTime: moment.Moment
    ) {}

    get parameters(): NetworkParameters.ParametersType {
        return this._parameters;
    }

    get expirationTime(): moment.Moment {
        return this._expirationTime;
    }
}
