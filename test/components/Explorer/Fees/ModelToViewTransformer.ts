import {expect} from "chai";
import operations from "../../../Context/Fees/Utilities/operations.json";
import ModelViewTransformer from "../../../../app/components/Explorer/Fees/ViewModel/ModelViewTransformer";
import {Fees} from "../../../../app/Context/Fees/types";
import JsonOperationsType = Fees.JsonOperationsType;
import {getOperations} from "../../../Context/Fees/Utilities/Operation";
import {getFees} from "../../../Context/Fees/Utilities/Fee";

describe("ModelToViewTransformer", () => {
    let modelViewTransformer: ModelViewTransformer;
    const networkPercentFee = 0.5;

    before(function() {
        modelViewTransformer = new ModelViewTransformer(
            (operations as unknown) as JsonOperationsType,
            10000,
            networkPercentFee
        );
    });

    describe("transform", () => {
        describe("transform one parameter", () => {
            it("should return one group", async () => {
                const operations = getOperations([{id: 0, name: "operation0"}]);

                const result = modelViewTransformer.transform(operations);

                expect(result.size).equals(1);

                const group = result.get("group1");
                expect(group.code).equals("group1");
                expect(group.name).equals("group1");
            });

            it("should return one group with operation", async () => {
                const operations = getOperations([{id: 0, name: "operation0"}]);

                const result = modelViewTransformer.transform(operations);
                const group = result.get("group1");

                expect(group.operations.size).equals(1);

                const operation = group.operations.first();
                expect(operation.id).equals(0);
                expect(operation.code).equals("operation0");
            });

            it("should return one group with operation and one fee", async () => {
                const operations = getOperations([
                    {
                        id: 0,
                        name: "operation0",
                        fees: getFees([{code: "fee1", value: 10000}])
                    }
                ]);

                const result = modelViewTransformer.transform(operations);
                const group = result.get("group1");
                const operation = group.operations.first();
                const fees = operation.fees;

                expect(fees.size).equals(1);

                const fee = fees.first();
                expect(fee.name).equals("fee1");
                expect(fee.standardFee).equals(10000);
                expect(fee.lifetimeMemberFee).equals(10000 * networkPercentFee);
            });
        });

        describe("transform 2 parameter with different groups", () => {
            it("should return 2 group with 1 parameter", async () => {
                const operations = getOperations([
                    {
                        id: 0,
                        name: "operation0"
                    },
                    {
                        id: 2,
                        name: "operation2"
                    }
                ]);

                const result = modelViewTransformer.transform(operations);

                expect(result.size).equals(2);

                const group1 = result.get("group1");
                expect(group1.code).equals("group1");
                expect(group1.name).equals("group1");

                const group2 = result.get("group2");
                expect(group2.code).equals("group2");
                expect(group2.name).equals("group2");
            });
        });
    });
});
