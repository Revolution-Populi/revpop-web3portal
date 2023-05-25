import {UseCaseError} from "../../../../Core/Logic/AppError";

export class SessionNotFoundError extends UseCaseError {
    constructor(id: string) {
        super(`The session with id ${id} was not found.`);
    }
}

export class SessionWrongStatus extends UseCaseError {
    constructor() {
        super(`The session has wrong status.`);
    }
}
