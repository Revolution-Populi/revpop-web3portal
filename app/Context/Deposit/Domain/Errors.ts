import {DomainError} from "../../Core";

export class SessionCanNotBePayed extends DomainError {
    constructor(sessionId: string) {
        super(`Session ${sessionId} can't be payed`);
    }
}
