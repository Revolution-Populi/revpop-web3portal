import {Map} from "immutable";
import NetworkParameter from "../../../../NetworkParameters/Domain/NetworkParameter";
import Create from "./Create";
import RepositoryInterface, {
    Proposal
} from "../../../Domain/RepositoryInterface";
import moment from "moment";
import {
    ParameterObjectValueType,
    ParameterValueType
} from "../../../../NetworkParameters/Domain/RepositoryInterface";

export default class CreateHandler {
    constructor(private repository: RepositoryInterface) {}

    async execute(command: Create): Promise<boolean> {
        const proposal: Proposal = {
            parameters: this.parameterMapToObject(command.parameters),
            expiration_time: command.expirationTime.diff(moment(), "second")
        };

        // const query = new GetChanged(command.parameters);
        // const handler = new GetChangedHandler();
        // const changedParameters = handler.execute(query)
        //
        // if (changedParameters.isEmpty()) {
        //     throw new Error("Changed parameters have not found")
        // }

        await this.repository.create(proposal);

        return true;
    }

    private parameterMapToObject(
        parameters: Map<string, NetworkParameter>
    ): ParameterObjectValueType {
        const objectParameters: ParameterObjectValueType = {};

        parameters.forEach(parameter => {
            parameter = parameter as NetworkParameter;
            const name = parameter.name;

            if (parameter.isLink()) {
                objectParameters[
                    name
                ] = parameter.linkValue as ParameterValueType;
            }

            if (parameter.isNormal()) {
                const value = parameter.isChanged()
                    ? parameter.newValue
                    : parameter.value;

                objectParameters[name] = value as ParameterValueType;
            }

            if (parameter.isGroup()) {
                objectParameters[name] = this.parameterMapToObject(
                    parameter.children
                );
            }
        });

        return objectParameters;
    }
}
