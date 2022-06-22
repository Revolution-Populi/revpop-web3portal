// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";
import RepositoryInterface from "../Domain/RepositoryInterface";
import {NetworkParameters} from "../types";
import BlockchainParametersType = NetworkParameters.BlockchainParametersType;

class BlockchainRepository implements RepositoryInterface {
    async load(): Promise<BlockchainParametersType> {
        const data = (
            await Apis.instance()
                .db_api()
                .exec("get_global_properties", [])
        ).parameters;

        return data;
    }
}

export default new BlockchainRepository();
