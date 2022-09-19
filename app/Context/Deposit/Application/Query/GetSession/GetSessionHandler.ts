import GetSession from "./GetSession";
import Session from "../../../Domain/Session";

export default class GetSessionHandler {
    execute(query: GetSession): Session {
        return new Session("sfasdf", "asdfasdf", "sadfsadf", 123);
    }
}
