import {Map} from "immutable";
import NetworkParameter from "../../../../NetworkParameters/Domain/NetworkParameter";
import moment from "moment";

export default class Create {
    constructor(
        private _parameters: Map<string, NetworkParameter>,
        private _expirationTime: moment.Moment
    ) {}

    get parameters(): Map<string, NetworkParameter> {
        return this._parameters;
    }

    get expirationTime(): moment.Moment {
        return this._expirationTime;
    }
}
