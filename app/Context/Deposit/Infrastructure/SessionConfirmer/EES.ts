import SessionConfirmerInterface from "../../Domain/SessionConfirmerInterface";

export default class EES implements SessionConfirmerInterface {
    confirm(sessionId: string, revpopAccount: string, txHash: string, hashLock: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}
