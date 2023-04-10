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

    public async checkDepositSubmittedToInternalBlockchain(
        sessionId: string
    ): Promise<boolean> {
        const result = await axios.post(
            EesAPI.BASE + EesAPI.CHECK_DEPOSIT_SUBMITTED_TO_INTERNAL_BLOCKCHAIN,
            {
                sessionId: sessionId
            }
        );

        return result.data.submitted;
    }

    private ensureHasPrefix(hashLock: string) {
        if ("0x" !== hashLock.substring(0, 2)) {
            hashLock = "0x" + hashLock;
        }

        return hashLock;
    }
}
