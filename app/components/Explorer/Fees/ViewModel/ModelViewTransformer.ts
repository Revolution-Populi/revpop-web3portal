import {Map} from "immutable";
import {Fees} from "../../../../Context/Fees/types";
import Operations = Fees.Operations;
import JsonOperationType = Fees.JsonOperationType;
import JsonOperationsType = Fees.JsonOperationsType;
import Operation from "../../../../Context/Fees/Domain/Operation";
import GroupView from "./Group";
import OperationView from "./Operation";
import FeeView from "./Fee";

type GroupsType = Map<string, GroupView>;

export default class ModelViewTransformer {
    private groups: GroupsType = Map<string, GroupView>().asMutable();

    constructor(private jsonOperations: JsonOperationsType) {}

    transform(operations: Operations): GroupsType {
        this.groups = Map<string, GroupView>().asMutable();

        operations.forEach((operation: Operation) => {
            const jsonOperation = this.jsonOperations.find(
                jsonOperation => jsonOperation.id == operation.id
            );

            if (jsonOperation) {
                const groupView = this.addGroup(jsonOperation);
                groupView.addOperation(
                    this.addOperationToGroup(groupView, operation)
                );
            }
        });

        return this.groups.asImmutable();
    }

    private addGroup(jsonOperation: JsonOperationType): GroupView {
        if (!this.groups.has(jsonOperation.group)) {
            const group = new GroupView(
                jsonOperation.group,
                jsonOperation.group
            );
            this.groups.set(group.code, group);
        }

        return this.groups.get(jsonOperation.group);
    }

    private addOperationToGroup(
        group: GroupView,
        operation: Operation
    ): OperationView {
        const operationView = new OperationView(operation.id, operation.name);

        operation.fees.forEach((feeValue, feeCode) => {
            const fee = new FeeView(
                feeCode as string,
                feeValue as number,
                feeValue as number
            );

            operationView.addFee(fee);
        });

        return operationView;
    }
}
