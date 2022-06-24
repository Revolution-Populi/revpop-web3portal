import Operation from "./Operation";
import {OrderedSet} from "immutable";

export default class Group {
    private _operations: OrderedSet<Operation> = OrderedSet<
        Operation
    >().asMutable();

    constructor(private _code: string, private _name: string) {}

    get code(): string {
        return this._code;
    }

    get name(): string {
        return this._name;
    }

    addOperation(operation: Operation) {
        this._operations.add(operation);
    }

    get operations(): OrderedSet<Operation> {
        return this._operations;
    }
}
