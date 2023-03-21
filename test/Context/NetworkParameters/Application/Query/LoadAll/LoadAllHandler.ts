import {expect} from "chai";
import stubRepository from "../../../../../../app/Context/NetworkParameters/Infrastructure/StubRepository";
import LoadAll from "../../../../../../app/Context/NetworkParameters/Application/Query/LoadAll/LoadAll";
import NetworkParameter from "../../../../../../app/Context/NetworkParameters/Domain/NetworkParameter";
import {addToApiResponse} from "../../../../../Factory/StubRepository";
import {getLoadAllHandler} from "../../../../../Factory/LoadAllHandler";
import {jsonNewParameter} from "../../../../../Factory/JsonParameter";

describe("LoadAllHandler", () => {
    afterEach(function() {
        stubRepository.clear();
    });

    describe("load", () => {
        it("empty result", async () => {
            const query = new LoadAll();
            const handler = getLoadAllHandler();

            const result = await handler.execute(query);
            expect(result.size).equals(0);
        });

        it("without children", async () => {
            stubRepository.add("test_parameter", "test_value");

            const query = new LoadAll();
            const handler = getLoadAllHandler();

            const result = await handler.execute(query);
            expect(result.size).equals(1);

            const parameter = result.get("test_parameter");
            expect(parameter).instanceof(NetworkParameter);
            expect(parameter.name).equals("test_parameter");
            expect(parameter.value).equals("test_value");
        });

        it("with children", async () => {
            stubRepository.add("extensions", {
                updatable_htlc_options: {
                    max_preimage_size: 1024000,
                    max_timeout_secs: 2592000
                }
            });

            const query = new LoadAll();
            const handler = getLoadAllHandler();

            const result = await handler.execute(query);
            expect(result.size).equals(1);

            const parameter = result.get("extensions");
            expect(parameter).instanceof(NetworkParameter);
            expect(parameter.value).null;
            expect(parameter.children.size).equals(1);
        });

        describe("new parameter", () => {
            describe("without default value", () => {
                it("should throw error", async () => {
                    const newParameter = jsonNewParameter({
                        defaultValue: null
                    });
                    addToApiResponse("old_parameter", 10);

                    const handler = getLoadAllHandler({
                        new_parameter: newParameter
                    });
                });
            });

            describe("with default value", () => {
                it("should add new parameter", async () => {
                    const newParameter = jsonNewParameter({
                        defaultValue: "default value"
                    });
                    addToApiResponse("old_parameter", 10);

                    const handler = getLoadAllHandler({
                        new_parameter: newParameter
                    });

                    const query = new LoadAll();
                    const result = await handler.execute(query);
                    expect(result.size).equals(2);

                    const resultNewParameter = result.last();
                    expect(resultNewParameter.name).equals("new_parameter");
                    expect(resultNewParameter.value).equals(
                        newParameter.defaultValue
                    );
                    expect(resultNewParameter.newValue).equals(
                        newParameter.defaultValue
                    );
                    expect(resultNewParameter.isModified()).true;
                });
            });
        });
    });
});
