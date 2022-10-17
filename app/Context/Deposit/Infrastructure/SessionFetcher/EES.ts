import axios, {AxiosResponse} from "axios";
import SessionFetcherInterface from "../../Domain/SessionFetcherInterface";
import Session from "../../Domain/Session";
import {EesAPI} from "../../../../api/apiConfig";
import {EesConnectionError, Result} from "../../../Core";
import {Failure, Success} from "../../../Core/Logic/Result";

interface EesSessionResponse {
    session_id: string;
    contract_address: string;
    receiver_address: string;
    minimum_deposit: string;
    minimum_timelock: number;
}

export default class EES implements SessionFetcherInterface {
    async fetch(): Promise<Result<EesConnectionError, Session>> {
        let response: AxiosResponse<EesSessionResponse>;

        try {
            response = await axios.get(EesAPI.BASE + EesAPI.INITIALIZE_SESSION);
        } catch (e) {
            return Failure.create(new EesConnectionError());
        }

        const sessionJson: EesSessionResponse = response.data;

        const session = new Session(
            sessionJson.session_id,
            sessionJson.contract_address,
            sessionJson.receiver_address,
            sessionJson.minimum_deposit,
            sessionJson.minimum_timelock
        );

        return Success.create(session);
    }
}
