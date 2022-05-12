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

export interface ParameterDescriptionType {
    [key: string]: {
        type: ParameterType;
        description: string;
        link?: string;
    };
}

class Factory implements FactoryInterface {
    constructor(private description: ParameterDescriptionType) {}

    create(name: string, value: ParameterValueType): NetworkParameter {
        const parameter = new NetworkParameter(name);

        this.addAddInfoFromLocalParameters(parameter);

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

    private addAddInfoFromLocalParameters(parameter: NetworkParameter) {
        if (
            Object.prototype.hasOwnProperty.call(
                this.description,
                parameter.name
            )
        ) {
            const parameterInfo = this.description[parameter.name];
            parameter.description = parameterInfo.description;
            parameter.type = parameterInfo.type;
            parameter.link = parameterInfo.link ? parameterInfo.link : null;
        }

        return parameter;
    }
}

export default Factory;
