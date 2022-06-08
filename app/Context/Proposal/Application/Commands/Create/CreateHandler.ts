import {Map} from "immutable";
import NetworkParameter from "../../../../NetworkParameters/Domain/NetworkParameter";
import Create from "./Create";
import {
    ParameterObjectValueType,
    ParameterValueType
} from "../../../../NetworkParameters/Domain/RepositoryInterface";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {Either, Failure, Success} from "../../../../Core/Logic/Result";
import {UnexpectedError} from "../../../../Core/Logic/AppError";
import {NetworkParameters} from "../../../../NetworkParameters/types";
import ParametersType = NetworkParameters.ParametersType;
import ProposalType = NetworkParameters.ProposalType;

type Response = Either<UnexpectedError, void>;

export default class CreateHandler {
    constructor(private repository: RepositoryInterface) {}

    async execute(command: Create): Promise<Response> {
        const proposal: ProposalType = {
            parameters: this.parameterMapToObject(command.parameters),
            expirationTime: command.expirationTime.unix(),
            reviewPeriod: this.getReviewPeriod(command.parameters)
        };

        // const query = new GetChanged(command.parameters);
        // const handler = new GetChangedHandler();
        // const changedParameters = handler.execute(query)
        //
        // if (changedParameters.isEmpty()) {
        //     throw new Error("Changed parameters have not found")
        // }

        try {
            await this.repository.create(proposal);
        } catch (error) {
            return Failure.create(new UnexpectedError(error)) as Response;
        }

        return Success.create() as Response;
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
                const value = parameter.isModified()
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

    private getReviewPeriod(parameters: ParametersType): number {
        const reviewPeriodParameter = parameters.get(
            "committee_proposal_review_period"
        );
        return reviewPeriodParameter.value as number;
    }
}
