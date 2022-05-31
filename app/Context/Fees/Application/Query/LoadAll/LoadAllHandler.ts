import RepositoryInterface from "../../../Domain/RepositoryInterface";
import LoadAll from "./LoadAll";
import {Fees} from "../../../types";
import Operations = Fees.OperationsType;

export default class LoadAllHandler {
    constructor(readonly repository: RepositoryInterface) {}

    async execute(query: LoadAll): Promise<Operations> {
        const operations = await this.repository.loadAll();

        return operations;
    }
}
