import Session from "./Session";
import {EesConnectionError, Result} from "../../Core";

export default interface SessionFetcherInterface {
    fetch: () => Promise<Result<EesConnectionError, Session>>;
}
