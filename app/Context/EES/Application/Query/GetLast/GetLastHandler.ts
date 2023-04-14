import GetLast from "./GetLast";
import HTLC from "../../../Domain/HTLC";

export default class GetLastHandler {
    execute(getLast: GetLast): HTLC {
        throw new Error("Not implemented!");
    }
}
