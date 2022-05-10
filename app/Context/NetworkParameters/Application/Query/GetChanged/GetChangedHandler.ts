import NetworkParameter from "../../../Domain/NetworkParameter";
import GetChanged from "./GetChanged";
import {Map} from "immutable";

export default class GetChangedHandler {
    execute(request: GetChanged): Map<string, NetworkParameter> {
        const parameters = request.parameters;

        return this.findChanged(parameters);
    }

    private findChanged(
        parameters: Map<string, NetworkParameter>
    ): Map<string, NetworkParameter> {
        let changedParameters: Map<string, NetworkParameter> = Map();

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

            if (child?.isNormal() && child?.isChanged()) {
                changedParameters = changedParameters.set(child?.name, child);
            }
        });

        return changedParameters;
    }
}
