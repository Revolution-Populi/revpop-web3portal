import {LoadAll, loadAllHandler} from "./index";
import {NetworkParameters} from "./types";
import NetworkParametersType = NetworkParameters.NetworkParametersType;

export async function loadAllParameters(): Promise<NetworkParametersType> {
    const query = new LoadAll();
    return await loadAllHandler.execute(query);
}
