import axios from "axios";
import RepositoryInterface, {
    DepositSettings
} from "../../Domain/EES/RepositoryInterface";
import {EesAPI} from "../../../../api/apiConfig";
import * as EesErrors from "../../../Deposit/Domain/EES/Errors";

export default class Repository implements RepositoryInterface {
    public async loadDepositSettings(): Promise<DepositSettings> {
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

    public async createDepositRequest(
        internalAccount: string,
        hashLock: string
    ): Promise<string> {
        try {
            const result = await axios.post(
                EesAPI.BASE + EesAPI.SUBMIT_DEPOSIT_REQUEST,
                {
                    revpopAccount: internalAccount,
                    hashLock: this.ensureHasPrefix(hashLock)
                }
            );

            return result.data.id;
        } catch (e) {
            throw new EesErrors.ConnectionError();
        }
    }

    private ensureHasPrefix(hashLock: string) {
        if ("0x" !== hashLock.substring(0, 2)) {
            hashLock = "0x" + hashLock;
        }

        return hashLock;
    }
}
