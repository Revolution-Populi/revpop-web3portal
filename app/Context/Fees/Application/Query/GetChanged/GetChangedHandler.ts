import {Map} from "immutable";
import GetChanged from "./GetChanged";
import {Fees} from "../../../types";
import OperationsType = Fees.OperationsType;

export default class GetChangedHandler {
    execute(request: GetChanged): OperationsType {
        const operations = request.parameters;

        return this.findChanged(operations);
    }

    private findChanged(operations: OperationsType): OperationsType {
        let changedParameters: OperationsType = Map();

        operations.forEach(operation => {});

        return changedParameters;
    }
}
