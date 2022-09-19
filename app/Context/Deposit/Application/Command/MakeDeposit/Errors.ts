import {Result} from "../../../../Core/Logic/Result";
import {UseCaseError} from "../../../../Core/Logic/UseCaseError";

export class SessionNotFoundError extends Result<UseCaseError> {
    constructor(id: string) {
        super(false, {
            message: `The session with id ${id} was not found.`
        } as UseCaseError);
    }
}

export class SessionAlreadyPayed extends Result<UseCaseError> {
    constructor(id: string) {
        super(false, {
            message: `The session with id ${id} was not found.`
        } as UseCaseError);
    }
}
