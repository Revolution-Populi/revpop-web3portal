import UpdateOperation from "./UpdateOperation";
import Operation from "../../../Domain/Operation";
import {Fees} from "../../../types";
import OperationsType = Fees.OperationsType;

export default class UpdateOperationHandler {
    execute(request: UpdateOperation): OperationsType {
        const operations = request.operations;

        const operation = operations.find(operation => {
            operation = operation as Operation;
            return operation.id == request.id;
        });

        if (!operation) {
            throw new Error(`operation ${request.id} not found`);
        }

        operation.updateFee(request.feeCode, request.value);

        operations.set(operation.id, operation);

        return operations;
    }
}
