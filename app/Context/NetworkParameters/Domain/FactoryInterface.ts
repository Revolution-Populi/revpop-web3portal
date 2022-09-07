import {ParameterValueType} from "./RepositoryInterface";
import NetworkParameter from "./NetworkParameter";

export default interface FactoryInterface {
    create: (name: string, value: ParameterValueType) => NetworkParameter;
}
