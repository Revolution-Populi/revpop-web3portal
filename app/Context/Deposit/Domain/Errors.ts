import {Result, DomainError} from "../../Core";

export class PaySessionError extends Result<DomainError> {
    constructor(sessionId: string) {
        super(false, {
            message: `Session ${sessionId} can't be payed`
        } as DomainError);
    }
}
