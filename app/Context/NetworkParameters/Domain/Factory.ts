import {isObject} from "lodash";
import {
    ParameterObjectValueType,
    ParameterValueType
} from "./RepositoryInterface";
import NetworkParameter from "./NetworkParameter";
import FactoryInterface from "./FactoryInterface";

export type ParameterType =
    | "bool"
    | "uint8_t"
    | "uint16_t"
    | "uint32_t"
    | "int64_t"
    | "link";

export type JsonParameterType = {
    type: ParameterType;
    description: string | null;
    link?: string | null;
    defaultValue?: ParameterValueType | null;
};

export type JsonParametersType = {
    [key: string]: JsonParameterType;
};

class Factory implements FactoryInterface {
    create(
        name: string,
        value: ParameterValueType,
        jsonParameter: JsonParameterType | null = null
    ): NetworkParameter {
        let parameter = new NetworkParameter(name);

        parameter = this.updateFromJsonParameter(parameter, jsonParameter);

        if (parameter.isLink()) {
            parameter.linkValue = value;

            return parameter;
        }

        if (!isObject(value)) {
            parameter.value = value;

            return parameter;
        }

        const childrenKeys = Object.keys(value);
        childrenKeys.forEach(
            name =>
                (parameter.children = parameter.children.set(
                    name,
                    this.create(name, (value as ParameterObjectValueType)[name])
                ))
        );

        return parameter;
    }

    private updateFromJsonParameter(
        parameter: NetworkParameter,
        jsonParameter: JsonParameterType | null
    ) {
        if (null != jsonParameter) {
            parameter.description = jsonParameter.description;
            parameter.type = jsonParameter.type;
            parameter.link = jsonParameter.link ? jsonParameter.link : null;
        }

        return parameter;
    }
}

export default Factory;
