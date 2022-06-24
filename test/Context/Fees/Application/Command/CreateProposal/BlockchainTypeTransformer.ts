import {expect} from "chai";
import {getOperations} from "../../../Utilities/Operation";
import {getFees} from "../../../Utilities/Fee";
import BlockchainTypeTransformer from "../../../../../../app/Context/Fees/Application/Command/CreateProposal/BlockchainTypeTransformer";

describe("BlockchainTypeTransformer", () => {
    const blockchainTypeTransformer: BlockchainTypeTransformer = new BlockchainTypeTransformer();

    describe("transform", () => {
        it("should return correct operations", async () => {
            const operations = getOperations([
                {
                    id: 7,
                    name: "operation0"
                }
            ]);
            const result = blockchainTypeTransformer.transform(operations);

            expect(result.length).equals(1);
            expect(result[0][0]).equals(7);
        });

        it("should return correct fees without changes", async () => {
            const operations = getOperations([
                {
                    id: 0,
                    name: "operation0",
                    fees: getFees([
                        {code: "fee0", value: 100},
                        {code: "fee1", value: 200, newValue: 250}
                    ])
                }
            ]);

            const result = blockchainTypeTransformer.transform(operations);

            const fees = result[0][1];

            expect(fees).have.keys("fee0", "fee1");
            expect(fees.fee0).equals(100);
            expect(fees.fee1).equals(250);
        });
    });
});
