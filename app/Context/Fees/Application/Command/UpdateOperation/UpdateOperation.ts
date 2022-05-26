import {Fees} from "../../../types";
import Operations = Fees.Operations;

export default class UpdateOperation {
    constructor(
        private operations: Operations,
        private id: number,
        private value: number
    ) {}
}
