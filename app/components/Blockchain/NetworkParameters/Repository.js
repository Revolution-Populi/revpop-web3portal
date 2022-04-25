import {Apis} from "@revolutionpopuli/revpopjs-ws";

class Repository {
    async load() {
        const data = (
            await Apis.instance()
                .db_api()
                .exec("get_global_properties", [])
        ).parameters;

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
}

export default new Repository();
