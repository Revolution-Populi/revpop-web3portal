import NetworkParameter from "../../../Domain/NetworkParameter";
import GetChanged from "./GetChanged";
import {Map} from "immutable";

export default class GetChangedHandler {
    execute(request: GetChanged): Map<string, NetworkParameter> {
        const parameters = request.parameters;
        // let changedParameters = Map<string, NetworkParameter>()

        const changedParameters = this.findChanged(parameters);

        // parameters.forEach(parameter => {
        //     if (parameter?.isGroup()) {
        //         const changedParameter = this.findChildrenChanged(parameter);
        //         changedParameters = changedParameters.set(changedParameter.name, changedParameter)
        //     }
        //
        //     if (parameter?.isNormal() && parameter?.isChanged()) {
        //         changedParameters = changedParameters.set(parameter.name, parameter)
        //     }
        // })

        return changedParameters;
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

    // private findChildrenChanged(parameter: NetworkParameter): NetworkParameter {
    //     // let changedParameters: Map<string, NetworkParameter>
    //
    //     parameter.children.forEach(child => {
    //         if (child?.isGroup()) {
    //             this.findChildrenChanged(child as NetworkParameter)
    //             // if (changedParameter.isGroup()) {
    //             //     changedParameters.set(changedParameter.name, changedParameter)
    //             // }
    //         }
    //
    //         if (child?.isNormal() && !child?.isChanged()) {
    //             parameter.children = parameter.children.remove(child?.name)
    //         }
    //     })
    //
    //     return parameter
    // }
}
