import stubRepository from "../../app/Context/NetworkParameters/Infrastructure/StubRepository";
import LoadAllHandler from "../../app/Context/NetworkParameters/Application/Query/LoadAll/LoadAllHandler";
import {NetworkParameters} from "../../app/Context/NetworkParameters/types";
import JsonParametersType = NetworkParameters.JsonParametersType;

export function getLoadAllHandler(jsonParameters: JsonParametersType = {}): LoadAllHandler {
    return new LoadAllHandler(stubRepository, jsonParameters);
}
