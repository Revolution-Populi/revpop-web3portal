import {UseCaseError} from "../../../Core/Logic/AppError";

export class CurrentAddressNotSelectedError extends UseCaseError {
    constructor() {
        super("Current address not selected");
    }
}
