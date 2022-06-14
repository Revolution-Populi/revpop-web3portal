import LoadAll from "./LoadAll";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {loadAllParameters as loadAllParametersFunction} from "../../../../NetworkParameters/Facade";
import Proposal from "../../../Domain/Proposal";
import {ProposalTypes} from "../../../types";
import ProposalsType = ProposalTypes.ProposalsType;
import ParametersType = ProposalTypes.ParametersType;
import {NetworkParameters} from "../../../../NetworkParameters/types";
import NetworkParametersType = NetworkParameters.NetworkParametersType;
import Parameter from "../../../Domain/Parameter";

export default class LoadAllHandler {
    constructor(
        readonly repository: RepositoryInterface,
        readonly loadAllParameters: typeof loadAllParametersFunction
    ) {}

    async execute(request: LoadAll): Promise<ProposalsType> {
        const proposals = await this.repository.loadAll();

        const networkParameters = await this.loadAllParameters();

        proposals.forEach(proposal => {
            proposal = proposal as Proposal;
            this.checkChangedParameters(networkParameters, proposal.parameters);
        });

        return proposals;
    }

    checkChangedParameters(
        networkParameters: NetworkParametersType,
        proposalParameters: ParametersType
    ) {
        proposalParameters.forEach(proposalParameter => {
            proposalParameter = proposalParameter as Parameter;

            if (networkParameters.has(proposalParameter.name)) {
                proposalParameter.networkValue = networkParameters.get(
                    proposalParameter.name
                ).value;
            } else {
                proposalParameter.markAsNew();
            }
        });
    }
}
