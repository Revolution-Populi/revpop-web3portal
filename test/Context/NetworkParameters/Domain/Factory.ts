import {expect} from "chai";
import Factory from "../../../../app/Context/NetworkParameters/Domain/Factory";

describe("Factory", () => {
    describe("create", () => {
        describe("simple parameter", () => {
            it("without description", async () => {
                const factory = new Factory({});
                const parameter = factory.create("test_name", "test value");

                expect(parameter.name).equals("test_name");
                expect(parameter.value).equals("test value");
                expect(parameter.description).null;
            });

            it("with description", async () => {
                const factory = new Factory({
                    test_name: {
                        type: "uint8_t",
                        description: "test name description"
                    }
                });
                const parameter = factory.create("test_name", "test value");

                expect(parameter.name).equals("test_name");
                expect(parameter.value).equals("test value");
                expect(parameter.description).equals("test name description");
                expect(parameter.type).equals("uint8_t");
            });
        });
    });
});
