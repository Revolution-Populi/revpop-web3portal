import {Fees} from "../types";
import Operations = Fees.Operations;

export default interface RepositoryInterface {
    loadAll: () => Promise<Operations>;
}
