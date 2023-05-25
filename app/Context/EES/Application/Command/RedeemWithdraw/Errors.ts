import {UseCaseError} from "../../../../Core/Logic/AppError";

export class SessionNotFoundError extends UseCaseError {
    constructor(id: string) {
        super(`The session with id ${id} was not found.`);
    }
}

export class InvalidSessionStatusError extends UseCaseError {
    constructor(id: string) {
        super(`The session with id ${id} cannot be paid.`);
    }
}

export class ExternalBlockchainError extends UseCaseError {}
