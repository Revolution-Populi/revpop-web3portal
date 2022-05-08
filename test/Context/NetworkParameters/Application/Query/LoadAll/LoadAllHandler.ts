import LoadAllHandler from "../../../../../../app/Context/NetworkParameters/Application/Query/LoadAll/LoadAllHandler";
import stubRepository from "../../../../../../app/Context/NetworkParameters/Infrastructure/StubRepository";
import LoadAll from "../../../../../../app/Context/NetworkParameters/Application/Query/LoadAll/LoadAll";
import {expect} from "chai";
import NetworkParameter from "../../../../../../app/Context/NetworkParameters/Domain/NetworkParameter";

describe("LoadAllHandler", () => {
    let handler: LoadAllHandler;

    before(function() {
        handler = new LoadAllHandler(stubRepository);
    });

    afterEach(function() {
        stubRepository.clear();
    });

    describe("load", () => {
        it("empty result", async () => {
            const query = new LoadAll();
            const result = await handler.execute(query);
            expect(result.size).equals(0);
        });

        it("without children", async () => {
            stubRepository.add("test_parameter", "test_value");

            const query = new LoadAll();
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
            const result = await handler.execute(query);
            expect(result.size).equals(1);

            const parameter = result.get("extensions");
            expect(parameter).instanceof(NetworkParameter);
            expect(parameter.value).null;
            expect(parameter.children.size).equals(1);
        });
    });
});
