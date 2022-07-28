import NetworkParameter from "../../../Domain/NetworkParameter";
import GetChanged from "./GetChanged";
import {Map} from "immutable";
import {NetworkParameters} from "../../../types";

export default class GetChangedHandler {
    execute(request: GetChanged): NetworkParameters.ParametersType {
        const parameters = request.parameters;

        return this.findChanged(parameters);
    }

    private findChanged(
        parameters: Map<string, NetworkParameter>
    ): NetworkParameters.ParametersType {
        let changedParameters: NetworkParameters.ParametersType = Map();

        parameters.forEach(child => {
            if (child?.isGroup()) {
                const children = this.findChanged(child.children);

                if (children.size > 0) {
                    child.children = children;
                    changedParameters = changedParameters.set(
                        child?.name,
                        child
                    );
                }
            }

            if (child?.isNormal() && child?.isModified()) {
                changedParameters = changedParameters.set(child?.name, child);
            }
        });

        return changedParameters;
    }
}
