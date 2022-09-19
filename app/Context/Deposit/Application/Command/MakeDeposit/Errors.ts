import {UseCaseError} from "../../../../Core/Logic/UseCaseError";

export class SessionNotFoundError extends UseCaseError {
    constructor(id: string) {
        super(`The session with id ${id} was not found.`);
    }
}

export class SessionAlreadyPaid extends UseCaseError {
    constructor(id: string) {
        super(`The session with id ${id} cannot be paid.`);
    }
}
