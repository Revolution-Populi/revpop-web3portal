import RepositoryInterface from "../../../Domain/RepositoryInterface";
import NetworkParameter from "../../../Domain/NetworkParameter";
import LoadAll from "./LoadAll";
import {Map} from "immutable";
import parameterDescription from "../../../Domain/parameters.json";
import Factory, {ParameterDescriptionType} from "../../../Domain/Factory";

export default class LoadAllHandler {
    constructor(readonly repository: RepositoryInterface) {}

    async execute(request: LoadAll): Promise<Map<string, NetworkParameter>> {
        const data = await this.repository.load();
        let parameters = Map<string, NetworkParameter>();

        const factory = new Factory(
            parameterDescription as ParameterDescriptionType
        );

        for (const [name, value] of Object.entries(data)) {
            const parameter = factory.create(name, value);
            parameters = parameters.set(name, parameter);
        }

        return parameters;
    }
}
