import SubmitWithdrawRequest from "./SubmitWithdrawRequest";
import EesRepositoryInterface from "../../../Domain/EES/RepositoryInterface";
import WithdrawSessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import WithdrawSession from "../../../Domain/Withdraw/WithdrawSession";

export default class SubmitWithdrawRequestHandler {
    constructor(
        private eesRepository: EesRepositoryInterface,
        private sessionRepository: WithdrawSessionRepositoryInterface
    ) {}

    async execute(command: SubmitWithdrawRequest): Promise<string> {
        const withdrawRequestId = await this.eesRepository.createWithdrawRequest(
            command.revpopAccount,
            command.value,
            command.ethereumAddress,
            command.withdrawalFeeAmount,
            command.withdrawalFeeCurrency
        );

        const session = WithdrawSession.create(
            withdrawRequestId,
            command.revpopAccount,
            command.value,
            command.hashLock,
            command.withdrawalFeeCurrency,
            command.withdrawalFeeAmount,
            command.transactionFeeCurrency,
            command.transactionFeeAmount,
            command.ethereumAddress
        );

        await this.sessionRepository.save(session);

        return session.id;
    }
}
