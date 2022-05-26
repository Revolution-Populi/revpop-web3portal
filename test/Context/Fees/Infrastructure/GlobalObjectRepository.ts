import {getGlobalObjectRepository} from "../Utilities/GlobalObjectRepository";
import {expect} from "chai";
import {getBlockchainOperation} from "../Utilities/Operation";

describe("GlobalObjectRepository", () => {
    describe("loadAll", () => {
        it("should return current number of operations", async () => {
            const repository = getGlobalObjectRepository([
                getBlockchainOperation(0),
                getBlockchainOperation(1)
            ]);

            const result = await repository.loadAll();

            expect(result.size).equals(2);
        });

        it("should return correct Operation object", async () => {
            const repository = getGlobalObjectRepository([
                getBlockchainOperation(0),
                getBlockchainOperation(1)
            ]);

            const result = await repository.loadAll();

            const operation1 = result.get(0);
            expect(operation1.id).equals(0);
            expect(operation1.name).equals("operation0");

            const operation2 = result.get(1);
            expect(operation2.id).equals(1);
            expect(operation2.name).equals("operation1");
        });

        it("Operation object should contain correct fees list", async () => {
            const repository = getGlobalObjectRepository([
                getBlockchainOperation(0, {fee: 86869, price_per_kbyte: 48260}),
                getBlockchainOperation(1, {
                    basic_fee: 482609,
                    premium_fee: 24130471,
                    price_per_kbyte: 48260
                })
            ]);
            const result = await repository.loadAll();

            const operation1 = result.get(0);
            const operation1Fees = operation1.fees;
            expect(operation1Fees.size).equals(2);
            expect(operation1Fees.has("fee")).true;
            expect(operation1Fees.get("fee")).equals(86869);
            expect(operation1Fees.has("price_per_kbyte")).true;
            expect(operation1Fees.get("price_per_kbyte")).equals(48260);

            const operation2 = result.get(1);
            const operation2Fees = operation2.fees;
            expect(operation2Fees.size).equals(3);
            expect(operation2Fees.has("basic_fee")).true;
            expect(operation2Fees.get("basic_fee")).equals(482609);
            expect(operation2Fees.has("premium_fee")).true;
            expect(operation2Fees.get("premium_fee")).equals(24130471);
            expect(operation2Fees.has("price_per_kbyte")).true;
            expect(operation2Fees.get("price_per_kbyte")).equals(48260);
        });
    });
});
