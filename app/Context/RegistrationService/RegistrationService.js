import axios from "axios";
import {RegistrationServiceAPI} from "../../api/apiConfig";

const RegistrationService = {
    async createAccount(
        owner_pubkey,
        active_pubkey,
        memo_pubkey,
        new_account_name,
        registrar,
        referrer,
        token
    ) {
        await axios.post(
            RegistrationServiceAPI.BASE +
                RegistrationServiceAPI.ACCOUNTS_ENDPOINT,
            {
                account: {
                    active_key: active_pubkey,
                    memo_key: memo_pubkey,
                    name: new_account_name,
                    owner_key: owner_pubkey,
                    refcode: null,
                    referrer: referrer,
                    token: token
                }
            }
        );
    }
};

export default RegistrationService;
