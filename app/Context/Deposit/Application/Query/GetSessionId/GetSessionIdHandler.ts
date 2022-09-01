import GetSessionId from "./GetSessionId";
import SessionId from "../../../Domain/SessionId";
import Web3 from "web3";

export default class GetSessionIdHandler {
    execute(query: GetSessionId): SessionId {
        //Query to EES
        return new SessionId(Web3.utils.randomHex(32));
    }
}
