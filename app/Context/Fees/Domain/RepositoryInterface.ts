import {Fees} from "../types";
import Operations = Fees.OperationsType;

export default interface RepositoryInterface {
    loadAll: () => Promise<[Operations, number, number]>;
}
