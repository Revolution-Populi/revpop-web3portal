import axios from "axios";
import GetDepositSettings from "./GetDepositSettings";
import {EesAPI} from "../../../../../api/apiConfig";
import EesRepository from "../../../Infrastructure/EES/Repository";
import {DepositSettings} from "../../../Domain/EES/RepositoryInterface";

export default class GetDepositSettingsHandler {
    constructor(private readonly repository: EesRepository) {}

    async execute(query: GetDepositSettings): Promise<DepositSettings> {
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
