import StartSession from "./StartSession";
import SessionFetcherInterface from "../../../Domain/SessionFetcherInterface";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import Session from "../../../Domain/Session";

export default class StartSessionHandler {
    constructor(
        private sessionRepository: SessionRepositoryInterface,
        private sessionFetcher: SessionFetcherInterface
    ) {}

    async execute(command: StartSession): Promise<Session> {
        const session = this.sessionFetcher.fetch();

        const result = await this.sessionRepository.save(session);

        return session;
    }
}
