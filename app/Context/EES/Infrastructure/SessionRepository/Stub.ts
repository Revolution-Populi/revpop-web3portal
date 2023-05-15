import SessionRepositoryInterface from "../../Domain/Deposit/SessionRepositoryInterface";
import Session from "../../Domain/Deposit/Session";

export default class Stub implements SessionRepositoryInterface {
    private sessions: {
        [index: string]: Session;
    } = {};

    load(sessionId: string): Promise<Session | null> {
        return Promise.resolve(this.sessions[sessionId] ?? null);
    }

    async all(): Promise<Session[]> {
        return Promise.resolve(Object.values(this.sessions));
    }

    save(session: Session): Promise<boolean> {
        this.sessions[session.id] = session;

        return Promise.resolve(true);
    }

    clean() {
        this.sessions = {};
    }

    get count(): number {
        return Object.keys(this.sessions).length;
    }

    getById(id: string): Session | null {
        if (!this.sessions[id]) {
            return null;
        }

        return this.sessions[id];
    }
}
