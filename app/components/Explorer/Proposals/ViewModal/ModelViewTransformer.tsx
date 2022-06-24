import React from "react";
import {Set} from "immutable";
import counterpart from "counterpart";
import Proposal from "../../../../Context/Proposal/Domain/Proposal";
import Parameter from "../../../../Context/Proposal/Domain/Parameter";
import Operation from "../../../../Context/Proposal/Domain/Operation";
import ParameterView from "./Parameter";
import OperationView from "./Operation";
import FeeView from "./Fee";
import {ProposalTypes} from "../../../../Context/Proposal/types";
import ParametersType = ProposalTypes.ParametersType;
import {NetworkParameters} from "../../../../Context/NetworkParameters/types";
import JsonParametersType = NetworkParameters.JsonParametersType;
import {Fees} from "../../../../Context/Fees/types";
import JsonOperationsType = Fees.JsonOperationsType;
import OperationsType = ProposalTypes.OperationsType;
import {Moment} from "moment";
import ProposalsType = ProposalTypes.ProposalsType;
import RowActions from "../ProposalRowActions";

export type ProposalViewType = {
    key: string;
    id: string;
    expiration_date: Moment;
    review_period: Moment;
    parameters: Set<ParameterView>;
    hasChangeParameters: boolean;
    operations: Set<OperationView>;
    hasChangeOperations: boolean;
    voted: boolean;
    actions: any;
};

type ProposalsViewType = ProposalViewType[];

export default class ModelViewTransformer {
    private operationTranslate;
    private feeTranslate;

    constructor(
        private jsonParameters: JsonParametersType,
        private jsonOperations: JsonOperationsType,
        private scale: number,
        private networkPercentOfFee: number
    ) {
        this.operationTranslate = counterpart.translate("transaction.trxTypes");
        this.feeTranslate = counterpart.translate("transaction.feeTypes");
    }

    transform(proposals: ProposalsType): ProposalsViewType {
        const proposalsView: ProposalsViewType = [];

        proposals.forEach(proposal => {
            proposal = proposal as Proposal;

            const transformParameters = this.transformParameters(proposal.parameters);
            const transformOperations = this.transformOperations(proposal.operations);

            const proposalView: ProposalViewType = {
                key: proposal.id,
                id: proposal.id,
                expiration_date: proposal.expirationDate,
                review_period: proposal.reviewPeriod,
                parameters: transformParameters,
                // @ts-ignore
                hasChangeParameters: transformParameters.find(parameter => parameter.changed) !== undefined,
                operations: transformOperations,
                // @ts-ignore
                hasChangeOperations: transformOperations.find(operation => operation.changed) !== undefined,
                voted: proposal.voted,
                actions: <RowActions proposal={proposal} />
            };

            proposalsView.push(proposalView);
        });

        return proposalsView;
    }

    transformParameters(parameters: ParametersType): Set<ParameterView> {
        const parametersView = Set<ParameterView>().asMutable();

        parameters.forEach(parameter => {
            parameter = parameter as Parameter;

            const parameterView = ParameterView.create(
                parameter.name,
                parameter.value,
                parameter.networkValue,
                parameter.changed,
                parameter.new
            );

            parametersView.add(parameterView);
        });

        return parametersView;
    }

    transformOperations(operations: OperationsType): Set<OperationView> {
        const operationsView = Set<OperationView>().asMutable();

        operations.forEach(operation => {
            operation = operation as Operation;

            const jsonOperation = this.jsonOperations.find(
                // @ts-ignore
                jsonOperation => jsonOperation.id === operation.id
            );

            const feesView: FeeView[] = [];

            for (const fee of operation.fees) {
                const feeView = FeeView.create(fee.code, fee.changed, fee.value, fee.networkValue);

                feesView.push(feeView);
            }

            const name = jsonOperation ? jsonOperation.name : operation.id.toString(10);

            const operationView = OperationView.create(operation.id, name, feesView, operation.changed);

            operationsView.add(operationView);
        });

        return operationsView;
    }
}
