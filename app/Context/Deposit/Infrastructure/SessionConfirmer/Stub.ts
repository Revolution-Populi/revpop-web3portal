import SessionConfirmerInterface from "../../Domain/SessionConfirmerInterface";
import {EesConnectionError, Result} from "../../../Core";
import {Success} from "../../../Core/Logic/Result";

interface Session {
    sessionId: string;
    txHash: string;
    revpopAccount: string;
    hashLock: string;
}

export default class Stub implements SessionConfirmerInterface {
    private confirmedSessions: {
        [index: string]: Session;
    } = {};

    async confirm(
        sessionId: string,
        revpopAccount: string,
        txHash: string,
        hashLock: string
    ): Promise<Result<EesConnectionError, void>> {
        this.confirmedSessions[sessionId] = {
            sessionId,
            txHash,
            revpopAccount,
            hashLock
        };

        return Success.create(undefined);
    }

    get size(): number {
        return Object.keys(this.confirmedSessions).length;
    }

    getById(sessionId: string): Session {
        return this.confirmedSessions[sessionId] ?? null;
    }
}
