import axios from "axios";
import GetEESSettings from "./GetEESSettings";
import {EesAPI} from "../../../../../api/apiConfig";
import EesRepository from "../../../Infrastructure/EES/Repository";
import {EESSettings} from "../../../Domain/EES/RepositoryInterface";

export default class GetEESSettingsHandler {
    constructor(private readonly repository: EesRepository) {}

    async execute(query: GetEESSettings): Promise<EESSettings> {
        const settings = (await axios.get(EesAPI.BASE + EesAPI.EES_SETTINGS))
            .data;

        return {
            contractAddress: settings.contract_address,
            receiverAddress: settings.receiver_address,
            minimumValue: settings.minimum_deposit,
            minimumTimeLock: settings.minimum_timelock,
            rvpWithdrawalFee: settings.rvp_withdrawal_fee,
            rvethWithdrawalFee: settings.rveth_withdrawal_fee,
            revpopCurrency: settings.revpop_currency,
            eesAccountName: settings.ees_account_name,
            withdrawTimeLock: settings.withdraw_timeLock
        };
    }
}
