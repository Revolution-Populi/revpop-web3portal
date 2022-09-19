import {DomainError} from "../../Core";

export class PaySessionError extends DomainError {
    constructor(sessionId: string) {
        super(`Session ${sessionId} can't be payed`);
    }
}
