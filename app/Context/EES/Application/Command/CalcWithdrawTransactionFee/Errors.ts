import {UseCaseError} from "../../../../Core/Logic/AppError";

export class EmptyFeePool extends UseCaseError {
    constructor() {
        super("The fee pool is empty.");
    }
}
