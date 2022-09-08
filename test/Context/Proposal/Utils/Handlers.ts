import {Map} from "immutable";
import stubRepository from "../../../../app/Context/Proposal/Infrastructure/StubRepository";
import LoadAllHandler from "../../../../app/Context/Proposal/Application/Query/LoadAll/LoadAllHandler";
import NetworkParameter from "../../../../app/Context/NetworkParameters/Domain/NetworkParameter";
import Operation from "../../../../app/Context/Fees/Domain/Operation";
import {NetworkParameters} from "../../../../app/Context/NetworkParameters/types";
import ParametersType = NetworkParameters.ParametersType;
import {Fees} from "../../../../app/Context/Fees/types";
import OperationsType = Fees.OperationsType;

function stubLoadAllParameters(networkParameters: NetworkParameter[]): Promise<ParametersType> {
    const parameters = Map<string, NetworkParameter>().asMutable();

    for (const networkParameter of networkParameters) {
        parameters.set(networkParameter.name, networkParameter);
    }

    return Promise.resolve(parameters);
}

function stubLoadAllOperations(stubOperations: Operation[]): Promise<OperationsType> {
    const operations: OperationsType = {};

    for (const stubOperation of stubOperations) {
        operations[stubOperation.id] = stubOperation;
    }

    return Promise.resolve(operations);
}

type Params = {
    networkParameters?: NetworkParameter[];
    operations?: Operation[];
};

export function loadAllHandler(params?: Params) {
    return new LoadAllHandler(
        stubRepository,
        stubLoadAllParameters.bind(stubLoadAllParameters, params?.networkParameters ?? []),
        stubLoadAllOperations.bind(stubLoadAllOperations, params?.operations ?? [])
    );
}
