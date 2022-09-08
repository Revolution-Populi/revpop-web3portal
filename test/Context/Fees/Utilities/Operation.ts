import Operation from "../../../../app/Context/Fees/Domain/Operation";
import Fee from "../../../../app/Context/Fees/Domain/Fee";
import {Fees} from "../../../../app/Context/Fees/types";
import Operations = Fees.OperationsType;
import OperationsType = Fees.OperationsType;

type NewOperationType = {
    id: number;
    name: string;
    fees?: Fee[];
};

type NewOperationsType = NewOperationType[];

export function getOperation(id: number, name: string, fees: Fee[]): Operation {
    const operation = new Operation(id, name);

    for (const fee in fees) {
        operation.addFee(fees[fee]);
    }

    return operation;
}

export function getOperations(newOperations: NewOperationsType): Operations {
    const operations: OperationsType = {};

    for (const newOperation of newOperations) {
        const operation = getOperation(
            newOperation.id,
            newOperation.name,
            newOperation.fees ?? []
        );

        operations[operation.id] = operation;
    }

    return operations;
}
