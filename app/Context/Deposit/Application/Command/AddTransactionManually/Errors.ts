import {UseCaseError} from "../../../../Core/Logic/AppError";

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

export class TransactionNotFound extends UseCaseError {
    constructor(txHash: string) {
        super(`The transaction with hash ${txHash} was not found.`);
    }
}

export class InvalidHashLock extends UseCaseError {
    constructor(txHash: string) {
        super(`The transaction with hash ${txHash} has different hash lock.`);
    }
}
