import stubRepository from "../../app/Context/NetworkParameters/Infrastructure/StubRepository";
import {ParameterValueType} from "../../app/Context/NetworkParameters/Domain/RepositoryInterface";

export function addToApiResponse(
    name: string,
    value: ParameterValueType
): void {
    stubRepository.add(name, value);
}
