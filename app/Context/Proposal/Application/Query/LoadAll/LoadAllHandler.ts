import LoadAll from "./LoadAll";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {loadAllParameters as loadAllParametersFunction} from "../../../../NetworkParameters/Facade";
import {ProposalTypes} from "../../../types";
import ProposalsType = ProposalTypes.ProposalsType;

export default class LoadAllHandler {
    constructor(
        readonly repository: RepositoryInterface,
        readonly loadAllParameters: typeof loadAllParametersFunction
    ) {}

    async execute(request: LoadAll): Promise<ProposalsType> {
        const proposals = await this.repository.loadAll();

        const allParameters = await this.loadAllParameters();

        return proposals;
    }
}
