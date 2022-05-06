import {isObject} from "lodash";
import {ParameterValueType} from "./RepositoryInterface";
import NetworkParameter from "./NetworkParameter";
import FactoryInterface from "./FactoryInterface";

class Factory implements FactoryInterface {
    create(name: string, value: ParameterValueType): NetworkParameter {
        const parameter = new NetworkParameter(name);

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
}

export default new Factory();
