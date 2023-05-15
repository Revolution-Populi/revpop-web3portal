import axios from "axios";
import SubmitDepositRequest from "./SubmitDepositRequest";
import EesRepositoryInterface from "../../../Domain/EES/RepositoryInterface";
import SessionRepositoryInterface from "../../../Domain/Deposit/SessionRepositoryInterface";
import Session from "../../../Domain/Deposit/Session";

export default class SubmitDepositRequestHandler {
    constructor(
        private eesRepository: EesRepositoryInterface,
        private sessionRepository: SessionRepositoryInterface
    ) {}

    async execute(command: SubmitDepositRequest): Promise<string> {
        let depositRequestId: string;

        depositRequestId = await this.eesRepository.createDepositRequest(
            command.revpopAccount,
            command.hashLock
        );

        const session = Session.create(
            depositRequestId,
            command.revpopAccount,
            command.value,
            command.hashLock,
            command.timeLock
        );

        await this.sessionRepository.save(session);

        return session.id;
    }
}
