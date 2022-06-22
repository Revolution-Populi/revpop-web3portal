import {LoadAll, loadAllHandler} from "./index";
import {NetworkParameters} from "./types";
import NetworkParametersType = NetworkParameters.NetworkParametersType;
import BlockchainParametersType = NetworkParameters.BlockchainParametersType;
import blockchainRepository from "./Infrastructure/BlockchainRepository";

export async function loadAllParameters(): Promise<NetworkParametersType> {
    const query = new LoadAll();
    return await loadAllHandler.execute(query);
}

export async function loadAllRawParameters(): Promise<BlockchainParametersType> {
    return await blockchainRepository.load();
}
