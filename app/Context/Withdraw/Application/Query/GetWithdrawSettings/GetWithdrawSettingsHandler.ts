import axios from "axios";
import GetWithdrawSettings from "./GetWithdrawSettings";
import {EesAPI} from "../../../../../api/apiConfig";
import EesRepository from "../../../Infrastructure/EES/Repository";
import {WithdrawSettings} from "../../../Domain/EES/RepositoryInterface";
export default class GetWithdrawSettingsHandler {
    constructor(private readonly repository: EesRepository) {}

    async execute(query: GetWithdrawSettings): Promise<WithdrawSettings> {
        const settings = (
            await axios.get(EesAPI.BASE + EesAPI.DEPOSIT_SETTINGS)
        ).data;

        return {
            withdrawalFee: settings.withdrawal_fee,
            minimumWithdrawalAmount: settings.minimum_withdrawal_amount,
            feeAccount: settings.fee_account,
            withdrawalTimeLock: settings.withdrawal_time_lock
        };
    }
}
