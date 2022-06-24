import {ParameterValueType as NetworkParameterValueType} from "../../../Domain/NetworkParameter";
import NetworkParameter from "../../../Domain/NetworkParameter";
import LoadAll from "./LoadAll";
import {Map} from "immutable";
import Factory from "../../../Domain/Factory";
import {isEmpty} from "lodash";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {NetworkParameters} from "../../../types";
import BlockchainParameterType = NetworkParameters.BlockchainParameterType;
import JsonParametersType = NetworkParameters.JsonParametersType;

export default class LoadAllHandler {
    constructor(readonly repository: RepositoryInterface, readonly jsonParameters: JsonParametersType) {}

    async execute(request: LoadAll): Promise<Map<string, NetworkParameter>> {
        const data = await this.repository.load();
        const parameters = Map<string, NetworkParameter>().asMutable();

        const factory = new Factory();

        for (const [name, value] of Object.entries(data)) {
            const parameter = factory.create(name, value, this.jsonParameters[name] ?? null);
            parameters.set(name, parameter);

            delete this.jsonParameters[name];
        }

        for (const [name, value] of Object.entries(this.jsonParameters)) {
            if (isEmpty(value.defaultValue)) {
                continue;
            }

            const parameter = factory.create(
                name,
                value.defaultValue as BlockchainParameterType,
                this.jsonParameters[name]
            );
            parameter.newValue = value.defaultValue as NetworkParameterValueType;
            parameters.set(name, parameter);
        }

        return parameters.asImmutable();
    }
}
