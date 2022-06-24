import {Fees} from "../../../types";
import OperationsType = Fees.OperationsType;

export default class GetChanged {
    constructor(private _operations: OperationsType) {}

    get parameters(): OperationsType {
        return this._operations;
    }
}
