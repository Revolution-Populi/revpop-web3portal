import {expect} from "chai";
import operations from "../../../Context/Fees/Utilities/operations.json";
import ModelViewTransformer from "../../../../app/components/Explorer/Fees/ViewModel/ModelViewTransformer";
import {Map} from "immutable";
import {Fees} from "../../../../app/Context/Fees/types";
import JsonOperationsType = Fees.JsonOperationsType;
import {getOperation} from "../../../Context/Fees/Utilities/Operation";
import Operation from "../../../../app/Context/Fees/Domain/Operation";

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
                const operations = Map<number, Operation>({
                    0: getOperation(0, "operation0")
                });

                const result = modelViewTransformer.transform(operations);

                expect(result.size).equals(1);

                const group = result.get("group1");
                expect(group.code).equals("group1");
                expect(group.name).equals("group1");
            });

            it("should return one group with operation", async () => {
                const operations = Map<number, Operation>({
                    0: getOperation(0, "operation0")
                });

                const result = modelViewTransformer.transform(operations);
                const group = result.get("group1");

                expect(group.operations.size).equals(1);

                const operation = group.operations.first();
                expect(operation.id).equals(0);
                expect(operation.code).equals("operation0");
            });

            it("should return one group with operation and one fee", async () => {
                const operations = Map<number, Operation>({
                    0: getOperation(0, "operation0", {
                        fee1: 10000
                    })
                });

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
                const operations = Map<number, Operation>({
                    0: getOperation(0, "operation0"),
                    2: getOperation(2, "operation2")
                });

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
