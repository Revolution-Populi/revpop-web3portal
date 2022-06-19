import {expect} from "chai";
import UpdateOperationHandler from "../../../../../../app/Context/Fees/Application/Command/UpdateOperation/UpdateOperationHandler";
import UpdateOperation from "../../../../../../app/Context/Fees/Application/Command/UpdateOperation/UpdateOperation";
import {getOperation} from "../../../Utilities/Operation";
import {getFees} from "../../../Utilities/Fee";
import TestError from "../../../../Utils/TestError";

describe("UpdateOperationHandler", () => {
    let handler: UpdateOperationHandler;

    beforeEach(function() {
        handler = new UpdateOperationHandler();
    });

    describe("execute", () => {
        it("result should return false if fee don't exists", async () => {
            const updateOperationCommand = new UpdateOperation(
                getOperation(
                    0,
                    "operation0",
                    getFees([{code: "fee1", value: 100}])
                ),
                "fee2",
                150
            );

            const result = handler.execute(updateOperationCommand);

            expect(result.isFailure()).true;
        });

        it("result should return successful result ", async () => {
            const updateOperationCommand = new UpdateOperation(
                getOperation(
                    0,
                    "operation0",
                    getFees([{code: "fee1", value: 100}])
                ),
                "fee1",
                150
            );

            const result = handler.execute(updateOperationCommand);

            expect(result.isSuccess()).true;
        });

        it("result should contain updated operation", async () => {
            const updateOperationCommand = new UpdateOperation(
                getOperation(
                    0,
                    "operation0",
                    getFees([
                        {code: "fee1", value: 100},
                        {code: "fee2", value: 200}
                    ])
                ),
                "fee1",
                150
            );

            const result = handler.execute(updateOperationCommand);

            if (result.isFailure()) {
                throw new TestError();
            }

            const operation = result.value;
            expect(operation.id).equals(0);
            expect(operation.name).equals("operation0");

            const operationFee0 = operation.getFee("fee1");
            expect(operationFee0.value).equals(100);
            expect(operationFee0.updated).true;
            expect(operationFee0.newValue).equals(150);

            const operationFee1 = operation.getFee("fee2");
            expect(operationFee1.value).equals(200);
            expect(operationFee1.updated).false;
            expect(operationFee1.newValue).null;
        });
    });
});
