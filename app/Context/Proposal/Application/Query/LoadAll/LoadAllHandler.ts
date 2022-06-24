import LoadAll from "./LoadAll";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {loadAllParameters as loadAllParametersFunction} from "../../../../NetworkParameters/Facade";
import {loadAllOperations as loadAllOperationsFunction} from "../../../../Fees/Facade";
import Proposal from "../../../Domain/Proposal";
import Parameter from "../../../Domain/Parameter";
import {ProposalTypes} from "../../../types";
import ProposalsType = ProposalTypes.ProposalsType;
import ParametersType = ProposalTypes.ParametersType;
import OperationsType = ProposalTypes.OperationsType;
import {NetworkParameters} from "../../../../NetworkParameters/types";
import NetworkParametersType = NetworkParameters.NetworkParametersType;
import {Fees} from "../../../../Fees/types";
import NetworkOperationsType = Fees.OperationsType;
import Operation from "../../../Domain/Operation";

export default class LoadAllHandler {
    constructor(
        readonly repository: RepositoryInterface,
        readonly loadAllParameters: typeof loadAllParametersFunction,
        readonly loadAllOperations: typeof loadAllOperationsFunction
    ) {}

    async execute(request: LoadAll): Promise<ProposalsType> {
        const proposals = await this.repository.loadAll();

        const networkParameters = await this.loadAllParameters();
        const operations = await this.loadAllOperations();

        proposals.forEach(proposal => {
            proposal = proposal as Proposal;
            this.checkChangedParameters(networkParameters, proposal.parameters);
            this.checkChangedOperations(operations, proposal.operations);
        });

        return proposals;
    }

    checkChangedParameters(networkParameters: NetworkParametersType, proposalParameters: ParametersType) {
        proposalParameters.forEach(proposalParameter => {
            proposalParameter = proposalParameter as Parameter;

            if (networkParameters.has(proposalParameter.name)) {
                proposalParameter.networkValue = networkParameters.get(proposalParameter.name).value;
            } else {
                proposalParameter.markAsNew();
            }
        });
    }

    checkChangedOperations(networkOperations: NetworkOperationsType, proposalOperations: OperationsType) {
        proposalOperations.forEach(proposalOperation => {
            proposalOperation = proposalOperation as Operation;
            const networkOperation = networkOperations[proposalOperation.id];

            if (!networkOperation) {
                return;
            }

            for (const fee of proposalOperation.fees) {
                if (!networkOperation.fees.has(fee.code)) {
                    continue;
                }

                const networkOperationFeeValue = networkOperation.fees.get(fee.code).value;

                if (fee.value !== networkOperationFeeValue) {
                    fee.setNetworkValue(networkOperationFeeValue);
                }
            }
        });
    }
}
