import WithdrawSessionRepositoryInterface from "../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import WithdrawSession from "../../Domain/Withdraw/WithdrawSession";

export default class Stub implements WithdrawSessionRepositoryInterface {
    private sessions: {
        [index: string]: WithdrawSession;
    } = {};

    load(sessionId: string): Promise<WithdrawSession | null> {
        return Promise.resolve(this.sessions[sessionId] ?? null);
    }

    async all(): Promise<WithdrawSession[]> {
        return Promise.resolve(Object.values(this.sessions));
    }

    save(session: WithdrawSession): Promise<boolean> {
        this.sessions[session.id] = session;

        return Promise.resolve(true);
    }

    clean() {
        this.sessions = {};
    }

    get count(): number {
        return Object.keys(this.sessions).length;
    }

    getById(id: string): WithdrawSession | null {
        if (!this.sessions[id]) {
            return null;
        }

        return this.sessions[id];
    }
}
