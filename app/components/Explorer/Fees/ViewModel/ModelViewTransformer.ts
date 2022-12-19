import {Map} from "immutable";
import counterpart from "counterpart";
import {Fees} from "../../../../Context/Fees/types";
import Operations = Fees.OperationsType;
import JsonOperationType = Fees.JsonOperationType;
import JsonOperationsType = Fees.JsonOperationsType;
import Operation from "../../../../Context/Fees/Domain/Operation";
import Fee from "../../../../Context/Fees/Domain/Fee";
import GroupView from "./Group";
import OperationView from "./Operation";
import FeeView from "./Fee";
import FeeValue from "../../../../Context/Fees/Domain/FeeValue";

type GroupsType = Map<string, GroupView>;

export default class ModelViewTransformer {
    private groups: GroupsType = Map<string, GroupView>().asMutable();
    private operationTranslate;
    private feeTranslate;

    constructor(
        private jsonOperations: JsonOperationsType,
        private scale: number,
        private networkPercentOfFee: number
    ) {
        this.operationTranslate = counterpart.translate("transaction.trxTypes");
        this.feeTranslate = counterpart.translate("transaction.feeTypes");
    }

    transform(operations: Operations): GroupsType {
        this.groups = Map<string, GroupView>().asMutable();

        for (const operationId in operations) {
            const operation = operations[operationId];

            const jsonOperation = this.jsonOperations.find(
                jsonOperation => jsonOperation.id === operation.id
            );

            if (jsonOperation) {
                const groupView = this.addGroup(jsonOperation);
                groupView.addOperation(this.transformOperation(operation));
            }
        }

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

    private transformOperation(operation: Operation): OperationView {
        const operationView = new OperationView(
            operation.id,
            operation.name,
            counterpart.translate(`transaction.trxTypes.${operation.name}`, {
                fallback: operation.name
            })
        );

        if (operation.showCHParticipantTransferFee) {
            operationView.setShowCHParticipantTransferFee();
        }

        if (operation.ltmRequired) {
            operationView.setLtmRequired();
        }

        operation.fees.forEach(fee => {
            fee = fee as Fee;

            const feeView = new FeeView(
                fee.code,
                counterpart.translate(`transaction.feeTypes.${fee.code}`, {
                    fallback: fee.code
                }),
                FeeValue.create(fee.value, fee.newValue),
                FeeValue.create(
                    fee.value * this.networkPercentOfFee,
                    fee.updated
                        ? (fee.newValue as number) * this.networkPercentOfFee
                        : null
                )
            );

            operationView.addFee(feeView);
        });

        return operationView;
    }
}
