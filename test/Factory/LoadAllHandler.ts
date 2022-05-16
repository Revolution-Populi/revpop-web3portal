import stubRepository from "../../app/Context/NetworkParameters/Infrastructure/StubRepository";
import LoadAllHandler from "../../app/Context/NetworkParameters/Application/Query/LoadAll/LoadAllHandler";
import {JsonParametersType} from "../../app/Context/NetworkParameters/Domain/Factory";

export function getLoadAllHandler(
    jsonParameters: JsonParametersType = {}
): LoadAllHandler {
    return new LoadAllHandler(stubRepository, jsonParameters);
}
