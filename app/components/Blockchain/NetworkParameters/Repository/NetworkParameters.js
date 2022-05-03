import {Apis} from "@revolutionpopuli/revpopjs-ws";

class NetworkParametersRepository {
    async load() {
        const data = (
            await Apis.instance()
                .db_api()
                .exec("get_global_properties", [])
        ).parameters;

        console.log(data);

        const parametersKeys = Object.keys(data);
        const parameters = {};

        parametersKeys.map(name => {
            parameters[name] = {
                name,
                value: data[name]
            };
        });

        return parameters;
    }

    async add(parameters) {
        console.log(parameters);
    }
}

export default new NetworkParametersRepository();
