import RepositoryInterface from "../../../Domain/RepositoryInterface";
import LoadAll from "./LoadAll";
import {Fees} from "../../../types";
import Operations = Fees.Operations;

export default class LoadAllHandler {
    constructor(readonly repository: RepositoryInterface) {}

    execute(request: LoadAll): Promise<Operations> {
        const operations = this.repository.loadAll();

        return operations;
    }
}
