import {Set} from "immutable";
import Parameter from "./Parameter";
import Operation from "./Operation";

export default class Proposal {
    constructor(private _id: string, private _parameters: Set<Parameter>, private _operations: Set<Operation>) {}

    get id(): string {
        return this._id;
    }

    static create(id: string, parameters: Set<Parameter>, operations: Set<Operation>) {
        return new Proposal(id, parameters, operations);
    }
}
