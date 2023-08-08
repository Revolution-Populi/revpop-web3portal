import axios from "axios";
import {TokenDistributionAPI} from "../../../api/apiConfig";
import TokenDistributionRepositoryInterface from "../Domain/TokenDistributionRepositoryInterface";

export default class TokenDistributionRepository
    implements TokenDistributionRepositoryInterface {
    public async createTokenDistributionRequest(
        accountName: string,
        phrase: string,
        publicKey: string
    ): Promise<string> {
        const result = await axios.post(
            TokenDistributionAPI.BASE + TokenDistributionAPI.REQUEST,
            {
                revpopAccount: accountName,
                phrase: phrase,
                publicKey: publicKey
            }
        );

        return result.data.id;
    }
}
