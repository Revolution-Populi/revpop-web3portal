import LoadAll from "./LoadAll";
import {NetworkParameters} from "../../../../NetworkParameters/types";
import ProposalsType = NetworkParameters.ProposalsType;
import RepositoryInterface from "../../../Domain/RepositoryInterface";

export default class LoadAllHandler {
    constructor(readonly repository: RepositoryInterface) {}

    async execute(request: LoadAll): Promise<ProposalsType> {
        const data = await this.repository.loadAll();

        return data;
    }
}
