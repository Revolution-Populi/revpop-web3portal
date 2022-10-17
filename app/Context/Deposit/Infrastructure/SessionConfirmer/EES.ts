import axios from "axios";
import SessionConfirmerInterface from "../../Domain/SessionConfirmerInterface";
import {EesAPI} from "../../../../api/apiConfig";
import {Failure, Result, Success} from "../../../Core/Logic/Result";
import {EesConnectionError} from "../../../Core";

export default class EES implements SessionConfirmerInterface {
    async confirm(
        sessionId: string,
        revpopAccount: string,
        txHash: string,
        hashLock: string
    ): Promise<Result<EesConnectionError, void>> {
        try {
            await axios.post(EesAPI.BASE + EesAPI.CONFIRM_SESSION, {sessionId, txHash, revpopAccount, hashLock});
        } catch (e) {
            return Failure.create(new EesConnectionError());
        }

        return Success.create(undefined);
    }
}
