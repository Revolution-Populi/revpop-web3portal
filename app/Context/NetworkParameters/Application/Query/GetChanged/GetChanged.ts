import {Map} from "immutable";
import NetworkParameter from "../../../Domain/NetworkParameter";

export default class GetChanged {
    constructor(private _parameters: Map<string, NetworkParameter>) {}

    get parameters(): Map<string, NetworkParameter> {
        return this._parameters;
    }
}
