import RepositoryInterface, {
    ParameterObjectValueType
} from "../Domain/RepositoryInterface";
// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";

class BlockchainRepository implements RepositoryInterface {
    async load(): Promise<ParameterObjectValueType> {
        const data = (
            await Apis.instance()
                .db_api()
                .exec("get_global_properties", [])
        ).parameters;

        return data;
    }
}

export default new BlockchainRepository();
