import {EesConnectionError, Result} from "../../Core";

export default interface SessionConfirmerInterface {
    confirm: (
        sessionId: string,
        revpopAccount: string,
        txHash: string,
        hashLock: string
    ) => Promise<Result<EesConnectionError, void>>;
}
