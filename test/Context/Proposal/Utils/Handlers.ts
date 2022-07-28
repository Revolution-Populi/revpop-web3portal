import stubRepository from "../../../../app/Context/Proposal/Infrastructure/StubRepository";
import LoadAllHandler from "../../../../app/Context/Proposal/Application/Query/LoadAll/LoadAllHandler";
import NetworkParameter from "../../../../app/Context/NetworkParameters/Domain/NetworkParameter";
import {Map} from "immutable";
import {NetworkParameters} from "../../../../app/Context/NetworkParameters/types";
import ParametersType = NetworkParameters.ParametersType;

function stubLoadAllParameters(
    ...networkParameters: NetworkParameter[]
): Promise<ParametersType> {
    const parameters = Map<string, NetworkParameter>().asMutable();

    for (const networkParameter of networkParameters) {
        parameters.set(networkParameter.name, networkParameter);
    }

    return Promise.resolve(parameters);
}

export function loadAllHandler(...networkParameters: NetworkParameter[]) {
    return new LoadAllHandler(
        stubRepository,
        stubLoadAllParameters.bind(stubLoadAllParameters, ...networkParameters)
    );
}
