import {expect} from "chai";
import Factory from "../../../../app/Context/NetworkParameters/Domain/Factory";
import {
    jsonLinkParameter,
    jsonNewParameter,
    jsonSimpleParameter
} from "../../../Factory/JsonParameter";

describe("Factory", () => {
    describe("create", () => {
        describe("simple parameter", () => {
            it("without description", async () => {
                const factory = new Factory();
                const parameter = factory.create("test_name", "test value");

                expect(parameter.name).equals("test_name");
                expect(parameter.value).equals("test value");
                expect(parameter.description).null;
            });

            it("with description", async () => {
                const factory = new Factory();

                const jsonParameter = jsonSimpleParameter(
                    "uint8_t",
                    "test name description"
                );
                const parameter = factory.create(
                    "test_name",
                    "test value",
                    jsonParameter
                );

                expect(parameter.name).equals("test_name");
                expect(parameter.value).equals("test value");
                expect(parameter.description).equals("test name description");
                expect(parameter.type).equals("uint8_t");
            });
        });

        describe("current fees parameter", () => {
            it("should create valid parameter", async () => {
                const jsonParameter = jsonLinkParameter({
                    link: "/explorer/fees"
                });
                const factory = new Factory();

                const currentFeesValue = {
                    parameters: [
                        [
                            0,
                            {
                                fee: 86869,
                                price_per_kbyte: 48260
                            }
                        ],
                        [
                            1,
                            {
                                basic_fee: 482609,
                                premium_fee: 24130471,
                                price_per_kbyte: 48260
                            }
                        ]
                    ],
                    scale: 10000
                };
                const parameter = factory.create(
                    "current_fees",
                    currentFeesValue,
                    jsonParameter
                );

                expect(parameter.isLink()).true;
                expect(parameter.link).equals(jsonParameter.link);
                expect(parameter.linkValue).eqls(currentFeesValue);
                expect(parameter.description).equals(jsonParameter.description);
            });
        });
    });
});
