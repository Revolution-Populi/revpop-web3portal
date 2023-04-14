import Session from "./Session";

export default interface SessionRepositoryInterface {
    load: (sessionId: string) => Promise<Session | null>;
    all: () => Promise<Session[]>;
    save: (session: Session) => Promise<boolean>;
}
