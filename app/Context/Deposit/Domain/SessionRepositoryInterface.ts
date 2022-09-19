import Session from "./Session";

export default interface SessionRepositoryInterface {
    load: (sessionId: string) => Promise<Session | null>;
    save: (session: Session) => Promise<boolean>;
}
