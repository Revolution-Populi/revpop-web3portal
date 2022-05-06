import {isObject} from "lodash";
import {ParameterValueType} from "./RepositoryInterface";
import NetworkParameter from "./NetworkParameter";
import FactoryInterface from "./FactoryInterface";

export type ParameterType =
    | "bool"
    | "uint8_t"
    | "uint16_t"
    | "uint32_t"
    | "int64_t";

export interface ParameterDescriptionType {
    [key: string]: {
        type: ParameterType;
        description: string;
    };
}

class Factory implements FactoryInterface {
    constructor(private description: ParameterDescriptionType) {}

    create(name: string, value: ParameterValueType): NetworkParameter {
        const parameter = new NetworkParameter(name);

        this.addDescriptionAndType(parameter);

        //TODO:: current_fees
        if (name === "current_fees") {
            parameter.link = "/explorer/fees";
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
                    this.create(name, value[name])
                ))
        );

        return parameter;
    }

    private addDescriptionAndType(parameter: NetworkParameter) {
        if (
            Object.prototype.hasOwnProperty.call(
                this.description,
                parameter.name
            )
        ) {
            parameter.description = this.description[
                parameter.name
            ].description;
            parameter.type = this.description[parameter.name].type;
        }

        return parameter;
    }
}

export default Factory;
