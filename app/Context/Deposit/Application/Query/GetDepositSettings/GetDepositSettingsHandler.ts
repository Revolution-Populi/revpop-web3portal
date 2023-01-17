import axios from "axios";
import GetDepositSettings from "./GetDepositSettings";
import {EesAPI} from "../../../../../api/apiConfig";
import {Settings} from "../../../../../components/Account/Deposit/Hooks/useLoadDepositSettings";

export default class GetDepositSettingsHandler {
    constructor() {}

    async execute(query: GetDepositSettings): Promise<Settings> {
        const settings = (
            await axios.get(EesAPI.BASE + EesAPI.DEPOSIT_SETTINGS)
        ).data;

        return {
            contractAddress: settings.contract_address,
            receiverAddress: settings.receiver_address,
            minimumValue: settings.minimum_deposit,
            minimumTimeLock: settings.minimum_timelock
        };
    }
}
