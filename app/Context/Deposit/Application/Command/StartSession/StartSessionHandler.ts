import StartSession from "./StartSession";
import SessionFetcherInterface from "../../../Domain/SessionFetcherInterface";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import Session from "../../../Domain/Session";
import {EesConnectionError, Result} from "../../../../Core";
import {Success} from "../../../../Core/Logic/Result";

type ErrorsType = EesConnectionError;

export default class StartSessionHandler {
    constructor(
        private sessionRepository: SessionRepositoryInterface,
        private sessionFetcher: SessionFetcherInterface
    ) {}

    async execute(command: StartSession): Promise<Result<ErrorsType, Session>> {
        //TODO:check if active session exists

        const sessionOrError = await this.sessionFetcher.fetch();

        if (sessionOrError.isFailure()) {
            return sessionOrError;
        }

        await this.sessionRepository.save(sessionOrError.value);

        return Success.create<Session>(sessionOrError.value);
    }
}
