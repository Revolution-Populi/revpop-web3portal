import stubRepository from "../../app/Context/NetworkParameters/Infrastructure/StubRepository";
import {NetworkParameters} from "../../app/Context/NetworkParameters/types";
import BlockchainParameterType = NetworkParameters.BlockchainParameterType;

export function addToApiResponse(name: string, value: BlockchainParameterType): void {
    stubRepository.add(name, value);
}
