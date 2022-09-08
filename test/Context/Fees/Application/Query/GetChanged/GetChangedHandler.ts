import {expect} from "chai";
import GetChanged from "../../../../../../app/Context/Fees/Application/Query/GetChanged/GetChanged";
import GetChangedHandler from "../../../../../../app/Context/Fees/Application/Query/GetChanged/GetChangedHandler";
import {getOperations} from "../../../Utilities/Operation";
import TestError from "../../../../Utils/TestError";
import {getFees} from "../../../Utilities/Fee";

describe("GetChanged", () => {
    let handler: GetChangedHandler;

    before(function() {
        handler = new GetChangedHandler();
    });

    describe("execute", () => {
        it("should return success result", () => {
            const operations = getOperations([{id: 0, name: "operation0"}]);
            const query = new GetChanged(operations);
            const resultOrError = handler.execute(query);

            expect(resultOrError.isSuccess()).true;
        });

        describe("if changed operations are not exist", () => {
            it("should return empty result", () => {
                const operations = getOperations([{id: 0, name: "operation0"}]);
                const query = new GetChanged(operations);
                const resultOrError = handler.execute(query);

                if (resultOrError.isFailure()) {
                    throw new TestError(resultOrError.error.message);
                }

                expect(Object.keys(resultOrError.value).length).equals(0);
            });
        });

        describe("if a changed operation exists", () => {
            it("should return result with correct operations", () => {
                const newOperations = getOperations([
                    {
                        id: 0,
                        name: "operation0",
                        fees: getFees([{code: "fee1", value: 100}])
                    },
                    {
                        id: 1,
                        name: "operation1",
                        fees: getFees([
                            {code: "fee2", value: 200, newValue: 250}
                        ])
                    }
                ]);

                const query = new GetChanged(newOperations);
                const operationsOrError = handler.execute(query);

                if (operationsOrError.isFailure()) {
                    throw new TestError(operationsOrError.error.message);
                }

                expect(Object.keys(operationsOrError.value).length).equals(1);

                const operations = operationsOrError.value;
                expect(operations).key("1");

                const operation = operations[1];
                expect(operation.id).equals(1);
                expect(operation.name).equals("operation1");
            });
        });
    });
});
