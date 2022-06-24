import UpdateOperation from "./UpdateOperation";
import Operation from "../../../Domain/Operation";
import {AppError} from "../../../../Core/Logic/AppError";
import {Failure, Result, Success} from "../../../../Core/Logic/Result";

export default class UpdateOperationHandler {
    execute(request: UpdateOperation): Result<AppError, Operation> {
        const operation = request.operation;

        try {
            operation.updateFee(request.feeCode, request.value);
        } catch (e) {
            return Failure.create(e as AppError);
        }

        return Success.create(operation);
    }
}
