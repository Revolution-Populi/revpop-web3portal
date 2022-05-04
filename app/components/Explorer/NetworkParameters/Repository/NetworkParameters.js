import {Apis} from "@revolutionpopuli/revpopjs-ws";
import parameterFactory from "../ParameterFactory";
import {Map} from "immutable";

class NetworkParametersRepository {
    async load() {
        const data = (
            await Apis.instance()
                .db_api()
                .exec("get_global_properties", [])
        ).parameters;

        const parametersKeys = Object.keys(data);
        let parameters = Map();

        parametersKeys.forEach(name => {
            parameters = parameters.set(
                name,
                parameterFactory.create(name, data[name])
            );
        });

        return parameters;
    }

    async add(parameters) {
        console.log(parameters);
    }
}

export default new NetworkParametersRepository();
