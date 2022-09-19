import SessionConfirmerInterface from "../../Domain/SessionConfirmerInterface";

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

    confirm(sessionId: string, revpopAccount: string, txHash: string, hashLock: string): Promise<boolean> {
        this.confirmedSessions[sessionId] = {
            sessionId,
            txHash,
            revpopAccount,
            hashLock
        };

        return Promise.resolve(true);
    }

    get size(): number {
        return Object.keys(this.confirmedSessions).length;
    }

    getById(sessionId: string): Session {
        return this.confirmedSessions[sessionId];
    }
}
