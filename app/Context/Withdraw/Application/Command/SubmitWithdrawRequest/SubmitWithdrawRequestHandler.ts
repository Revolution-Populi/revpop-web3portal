import SubmitWithdrawRequest from "./SubmitWithdrawRequest";
import EesRepositoryInterface from "../../../Domain/EES/RepositoryInterface";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import Session from "../../../Domain/Session";

export default class SubmitWithdrawRequestHandler {
    constructor(
        private eesRepository: EesRepositoryInterface,
        private sessionRepository: SessionRepositoryInterface
    ) {}

    async execute(command: SubmitWithdrawRequest): Promise<string> {
        let withdrawRequestId: string;

        withdrawRequestId = await this.eesRepository.createWithdrawRequest(
            command.revpopAccount,
            command.address
        );

        const session = Session.create(
            withdrawRequestId,
            command.revpopAccount,
            command.value,
            command.hashLock,
            command.address
        );

        await this.sessionRepository.save(session);

        return session.id;
    }
}
