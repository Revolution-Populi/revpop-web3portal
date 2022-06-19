import GetChanged from "./GetChanged";
import {Fees} from "../../../types";
import OperationsType = Fees.OperationsType;
import {Result, Success} from "../../../../Core/Logic/Result";
import {AppError} from "../../../../Core/Logic/AppError";

export default class GetChangedHandler {
    execute(request: GetChanged): Result<AppError, OperationsType> {
        const operations = request.parameters;

        return Success.create(this.findChanged(operations));
    }

    private findChanged(operations: OperationsType): OperationsType {
        const changedOperations: OperationsType = {};

        for (const operationId in operations) {
            const operation = operations[operationId];

            if (!operation.updated) {
                continue;
            }

            changedOperations[operation.id] = operation;
        }

        return changedOperations;
    }
}
