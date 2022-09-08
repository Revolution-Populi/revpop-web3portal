import {NetworkParameters} from "../../app/Context/NetworkParameters/types";
import JsonParameterType = NetworkParameters.JsonParameterType;
import ParameterType = NetworkParameters.ParameterType;

export function jsonSimpleParameter(type: ParameterType, description: string | null = null): JsonParameterType {
    return {
        type,
        description
    };
}

export function jsonLinkParameter(fields: Pick<JsonParameterType, "link">): JsonParameterType {
    const simpleParameter = jsonSimpleParameter("link", "link parameter description");
    return Object.assign(simpleParameter, fields);
}

export function jsonNewParameter(fields: Pick<JsonParameterType, "defaultValue">): JsonParameterType {
    const simpleParameter = jsonSimpleParameter("uint8_t", "new parameter description");
    return Object.assign(simpleParameter, fields);
}
