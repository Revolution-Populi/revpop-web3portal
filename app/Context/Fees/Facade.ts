import {LoadAll, loadAllHandler} from "./";
import {Fees} from "./types";
import OperationsType = Fees.OperationsType;

export async function loadAllOperations(): Promise<OperationsType> {
    const query = new LoadAll();
    const [operations] = await loadAllHandler.execute(query);
    return operations;
}

export async function getScaleAndNetworkPercentOfFee(): Promise<[number, number]> {
    const query = new LoadAll();
    const [_, scale, networkPercentOfFee] = await loadAllHandler.execute(query);
    return [scale, networkPercentOfFee];
}
