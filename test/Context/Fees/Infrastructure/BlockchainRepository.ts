import {expect} from "chai";
import {getBlockchainRepository} from "../Utilities/BlockchainRepository";
import {getBlockchainOperation} from "../Utilities/BlockchainOperation";
import Fee from "../../../../app/Context/Fees/Domain/Fee";

describe("BlockchainRepository", () => {
    describe("loadAll", () => {
        it("should return current number of operations", async () => {
            const repository = getBlockchainRepository([
                getBlockchainOperation(0),
                getBlockchainOperation(1)
            ]);

            const [result] = await repository.loadAll();

            expect(Object.keys(result).length).equals(2);
        });

        it("should return correct Operation object", async () => {
            const repository = getBlockchainRepository([
                getBlockchainOperation(0),
                getBlockchainOperation(1)
            ]);

            const [result] = await repository.loadAll();

            const operation1 = result[0];
            expect(operation1.id).equals(0);
            expect(operation1.name).equals("operation0");

            const operation2 = result[1];
            expect(operation2.id).equals(1);
            expect(operation2.name).equals("operation1");
        });

        it("Operation object should contain correct fees list", async () => {
            const repository = getBlockchainRepository([
                getBlockchainOperation(0, {fee: 86869, price_per_kbyte: 48260}),
                getBlockchainOperation(1, {
                    basic_fee: 482609,
                    premium_fee: 24130471,
                    price_per_kbyte: 48260
                })
            ]);
            const [result] = await repository.loadAll();

            const operation0 = result[0];
            const operation0Fees = operation0.fees;
            expect(operation0Fees.size).equals(2);

            expect(operation0Fees.has("fee")).true;
            assertFee(operation0Fees.get("fee"), 86869, null);

            expect(operation0Fees.has("price_per_kbyte")).true;
            assertFee(operation0Fees.get("price_per_kbyte"), 48260, null);

            const operation2 = result[1];
            const operation2Fees = operation2.fees;
            expect(operation2Fees.size).equals(3);

            expect(operation2Fees.has("basic_fee")).true;
            assertFee(operation2Fees.get("basic_fee"), 482609, null);

            expect(operation2Fees.has("premium_fee")).true;
            assertFee(operation2Fees.get("premium_fee"), 24130471, null);

            expect(operation2Fees.has("price_per_kbyte")).true;
            assertFee(operation2Fees.get("price_per_kbyte"), 48260, null);
        });
    });
});

function assertFee(fee: Fee, value: number, newValue: number | null) {
    expect(fee.value).equals(value);
    expect(fee.newValue).equals(newValue);
}
