import {expect} from "chai";
import UpdateOperationHandler from "../../../../../../app/Context/Fees/Application/Command/UpdateOperation/UpdateOperationHandler";
import UpdateOperation from "../../../../../../app/Context/Fees/Application/Command/UpdateOperation/UpdateOperation";
import {getOperations} from "../../../Utilities/Operation";

describe("UpdateOperationHandler", () => {
    let handler: UpdateOperationHandler;

    beforeEach(function() {
        handler = new UpdateOperationHandler();
    });

    describe("execute", () => {
        it("result should contain current count of operations", async () => {
            const updateOperationCommand = new UpdateOperation(
                getOperations([
                    {id: 0, name: "operation0", fees: {fee1: 100}},
                    {id: 1, name: "operation1", fees: {fee1: 200}}
                ]),
                0,
                "fee1",
                150
            );

            const result = handler.execute(updateOperationCommand);

            expect(result.size).equals(2);
        });

        it("result should contain updated operation", async () => {
            const updateOperationCommand = new UpdateOperation(
                getOperations([
                    {id: 0, name: "operation0", fees: {fee1: 100}},
                    {id: 1, name: "operation1", fees: {fee1: 200}}
                ]),
                0,
                "fee1",
                150
            );

            const result = handler.execute(updateOperationCommand);

            const operation0 = result.get(0);
            expect(operation0.id).equals(0);
            expect(operation0.name).equals("operation0");

            const operation0Fee0 = operation0.getFee("fee1");
            expect(operation0Fee0.value).equals(100);
            expect(operation0Fee0.updated).true;
            expect(operation0Fee0.newValue).equals(150);

            const operation1 = result.get(1);
            const operation1Fee1 = operation1.getFee("fee1");
            expect(operation1Fee1.value).equals(200);
            expect(operation1Fee1.updated).false;
            expect(operation1Fee1.newValue).null;
        });
    });
});
