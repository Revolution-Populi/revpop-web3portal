import {GetLast, getLastHandler} from "./index";
import HTLC from "./Domain/HTLC";

export async function getLastHTLC(): Promise<HTLC> {
    const query = new GetLast();
    return getLastHandler.execute(query);
}
