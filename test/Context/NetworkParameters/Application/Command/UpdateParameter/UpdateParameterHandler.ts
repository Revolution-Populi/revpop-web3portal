import {expect} from "chai";
import NetworkParameter from "../../../../../../app/Context/NetworkParameters/Domain/NetworkParameter";
import UpdateParameterHandler from "../../../../../../app/Context/NetworkParameters/Application/Commands/UpdateParameter/UpdateParameterHandler";
import UpdateParameter from "../../../../../../app/Context/NetworkParameters/Application/Commands/UpdateParameter/UpdateParameter";
import {Map} from "immutable";
import {extensionsParameter} from "../../../../../Factory/Parameter";

describe("UpdateParameterHandler", () => {
    let handler: UpdateParameterHandler;
    let parameters: Map<string, NetworkParameter>;

    beforeEach(function() {
        handler = new UpdateParameterHandler();
        parameters = Map();
    });

    describe("execute", () => {
        it("without children", async () => {
            const parameter = new NetworkParameter("test name");
            parameter.value = "test value";
            parameters = parameters.set("test name", parameter);

            const query = new UpdateParameter(
                parameters,
                "test name",
                "test value new"
            );
            const result = await handler.execute(query);

            expect(result.size).equals(1);
            expect(result.get("test name").value).equals("test value");
            expect(result.get("test name").newValue).equals("test value new");
        });

        it("with link", async () => {
            const parameter = new NetworkParameter("test name");
            parameter.link = "test link";
            parameters = parameters.set("test name", parameter);

            const query = new UpdateParameter(
                parameters,
                "test name",
                "test value new"
            );
            const result = await handler.execute(query);

            expect(result.size).equals(1);
            expect(result.get("test name").value).null;
            expect(result.get("test name").link).equals("test link");
            expect(result.get("test name").newValue).null;
        });

        it("with children", async () => {
            const parameter = extensionsParameter();
            parameters = parameters.set("extensions", parameter);

            const query = new UpdateParameter(
                parameters,
                "extensions.updatable_htlc_options.max_timeout_secs",
                1000
            );
            const result = await handler.execute(query);

            expect(result.size).equals(1);

            const extensions = parameters.get("extensions");
            expect(extensions.children.size).equals(1);

            const updatableHtlcOptions = extensions.children.get(
                "updatable_htlc_options"
            );
            expect(updatableHtlcOptions.children.size).equals(2);

            const maxTimeoutSecs = updatableHtlcOptions.children.get(
                "max_timeout_secs"
            );
            expect(maxTimeoutSecs.value).equals(2592000);
            expect(maxTimeoutSecs.newValue).equals(1000);
        });
    });
});
