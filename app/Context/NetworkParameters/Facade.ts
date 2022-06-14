import {LoadAll, loadAllHandler} from "./index";

export async function loadAllParameters() {
    const query = new LoadAll();
    return await loadAllHandler.execute(query);
}
