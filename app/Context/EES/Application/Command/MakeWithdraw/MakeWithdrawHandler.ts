import MakeWithdraw from "./MakeWithdraw";
import SessionRepositoryInterface from "../../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import EesRepositoryInterface from "../../../Infrastructure/EES/Repository";
import * as Errors from "./Errors";
import InternalBlockchainRepositoryInterface from "../../../Domain/InternalBlockchain/RepositoryInterface";
import TransactionConfirmStore from "../../../../../stores/TransactionConfirmStore";

export default class MakeWithdrawHandler {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly eesRepository: EesRepositoryInterface,
        private readonly internalRepository: InternalBlockchainRepositoryInterface
    ) {}

    async execute(command: MakeWithdraw): Promise<boolean> {
        const session = await this.sessionRepository.load(command.sessionId);

        if (session === null) {
            throw new Errors.SessionNotFoundError(command.sessionId);
        }

        if (!session.isCreated()) {
            throw new Errors.SessionAlreadyPaid(command.sessionId);
        }

        const settings = await this.eesRepository.loadEESSettings();
        let isError = false;
        const onFinishConfirm = async (confirm_store_state: any) => {
            if (confirm_store_state.error) {
                isError = true;
            }
            if (
                confirm_store_state.error ||
                (confirm_store_state.included &&
                    confirm_store_state.broadcasted_transaction)
            ) {
                TransactionConfirmStore.unlisten(onFinishConfirm);
                TransactionConfirmStore.reset();
            }
        };

        TransactionConfirmStore.listen(onFinishConfirm);
        await this.internalRepository.withdraw(settings, session);
        if (!isError) {
            session.submittedInInternalBlockchain();
            await this.sessionRepository.save(session);
        }

        return !isError;
    }
}
