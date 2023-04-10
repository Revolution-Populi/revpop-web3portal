import {DomainError} from "../../Core";

export class SessionWrongStatusError extends DomainError {
    constructor(sessionId: string, message: string) {
        super(`Session ${sessionId} can't be processed: ${message}`);
    }
}
