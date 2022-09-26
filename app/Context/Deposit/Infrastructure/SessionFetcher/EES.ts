import moment from "moment";
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
        try {
            const response = await fetch(EesAPI.BASE + EesAPI.INITIALIZE_SESSION, {
                mode: "cors"
            });

            if (!response.ok) {
                return Failure.create(new EesConnectionError());
            }

            const sessionJson: EesSessionResponse = await response.json();

            const session = new Session(
                sessionJson.session_id,
                sessionJson.contract_address,
                sessionJson.receiver_address,
                sessionJson.minimum_deposit,
                sessionJson.minimum_timelock
            );

            return Success.create(session);
        } catch (e) {
            return Failure.create(new EesConnectionError());
        }
    }
}
