import axios from "axios";
import RepositoryInterface, {
    WithdrawSettings
} from "../../Domain/EES/RepositoryInterface";
import {EesAPI} from "../../../../api/apiConfig";
import * as EesErrors from "../../../Withdraw/Domain/EES/Errors";

export default class Repository implements RepositoryInterface {
    public async loadWithdrawSettings(): Promise<WithdrawSettings> {
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

    public async createWithdrawRequest(
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
