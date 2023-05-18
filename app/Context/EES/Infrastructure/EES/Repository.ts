import axios from "axios";
import RepositoryInterface, {
    EESSettings
} from "../../Domain/EES/RepositoryInterface";
import {EesAPI} from "../../../../api/apiConfig";
import * as EesErrors from "../../../EES/Domain/EES/Errors";

export default class Repository implements RepositoryInterface {
    public async loadEESSettings(): Promise<EESSettings> {
        const settings = (await axios.get(EesAPI.BASE + EesAPI.EES_SETTINGS))
            .data;

        return {
            depositContractAddress: settings.deposit_contract_address,
            withdrawContractAddress: settings.withdraw_contract_address,
            receiverAddress: settings.receiver_address,
            minimumValue: settings.minimum_deposit,
            minimumTimeLock: settings.minimum_timelock,
            rvpWithdrawalFee: settings.rvp_withdrawal_fee,
            rvethWithdrawalFee: settings.rveth_withdrawal_fee,
            revpopCurrency: settings.revpop_asset_symbol,
            eesAccountName: settings.revpop_ees_account,
            withdrawTimeLock: settings.withdraw_timelock
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

    public async createWithdrawRequest(
        internalAccount: string,
        amountToPayInRVETH: number,
        addressOfUserInEthereum: string
    ): Promise<string> {
        try {
            const result = await axios.post(
                EesAPI.BASE + EesAPI.SUBMIT_WITHDRAW_REQUEST,
                {
                    revpopAccount: internalAccount,
                    amountToPayInRVETH: amountToPayInRVETH,
                    addressOfUserInEthereum: addressOfUserInEthereum
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

    public async getWithdrawExternalContractId(
        sessionId: string
    ): Promise<string> {
        const result = await axios.post(
            EesAPI.BASE + EesAPI.GET_WITHDRAW_EXTERNAL_CONTRACT_ID,
            {
                sessionId: sessionId
            }
        );

        return result.data.contractId;
    }

    private ensureHasPrefix(hashLock: string) {
        if ("0x" !== hashLock.substring(0, 2)) {
            hashLock = "0x" + hashLock;
        }

        return hashLock;
    }
}
