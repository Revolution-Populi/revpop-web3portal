import UpdateParameter from "./UpdateParameter";
import {Map} from "immutable";
import NetworkParameter, {
    ParameterValueType
} from "../../../Domain/NetworkParameter";

export default class UpdateParameterHandler {
    execute(command: UpdateParameter): Map<string, NetworkParameter> {
        let parameters = command.parameters;
        const path = command.key.split(".");
        const level1Name = path.shift() as string;
        const level1Parameter = command.parameters.get(level1Name);

        if (level1Parameter.isLink()) {
            return parameters;
        }

        if (level1Parameter.isNormal()) {
            level1Parameter.newValue = command.newValue;
        }

        if (level1Parameter.isGroup()) {
            this.updateGroupParameter(level1Parameter, path, command.newValue);
        }

        parameters = parameters.set(level1Parameter.name, level1Parameter);

        return parameters;
    }

    updateGroupParameter(
        parameter: NetworkParameter,
        path: string[],
        newValue: ParameterValueType
    ) {
        if (path.length == 0) {
            parameter.newValue = newValue;
            return;
        }

        if (parameter.isGroup()) {
            const name = path.shift();
            const child = parameter.children.find(child => child?.name == name);
            this.updateGroupParameter(child, path, newValue);
        }
    }
}
