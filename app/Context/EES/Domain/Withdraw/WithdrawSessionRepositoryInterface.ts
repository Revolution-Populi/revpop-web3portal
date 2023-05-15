import WithdrawSession from "./WithdrawSession";

export default interface WithdrawSessionRepositoryInterface {
    load: (sessionId: string) => Promise<WithdrawSession | null>;
    all: () => Promise<WithdrawSession[]>;
    save: (session: WithdrawSession) => Promise<boolean>;
}
