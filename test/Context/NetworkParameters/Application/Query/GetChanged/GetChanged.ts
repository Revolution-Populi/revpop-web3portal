import GetChangedHandler from "../../../../../../app/Context/NetworkParameters/Application/Query/GetChanged/GetChangedHandler";
import GetChanged from "../../../../../../app/Context/NetworkParameters/Application/Query/GetChanged/GetChanged";
import {Map} from "immutable";
import NetworkParameter from "../../../../../../app/Context/NetworkParameters/Domain/NetworkParameter";
import {
    extensionsParameter,
    groupParameterWith1LevelChildren,
    simpleParameter
} from "../../../../../Factory/Parameter";
import {expect} from "chai";

describe("GetChanged", () => {
    let handler: GetChangedHandler;

    before(function() {
        handler = new GetChangedHandler();
    });

    describe("simple parameter", () => {
        it("empty parameters", async () => {
            const parameters = Map<string, NetworkParameter>();

            const query = new GetChanged(parameters);
            const result = handler.execute(query);

            expect(result.size).equals(0);
        });

        it("changed parameters not exist", async () => {
            let parameters = Map<string, NetworkParameter>();

            const parameterNotChanged = simpleParameter(
                "not_changed",
                "not changed value"
            );
            const parameterNotChanged2 = simpleParameter(
                "not_changed_2",
                "not changed value 2"
            );

            parameters = parameters.set("not_changed", parameterNotChanged);
            parameters = parameters.set("not_changed_2", parameterNotChanged2);

            const query = new GetChanged(parameters);
            const result = handler.execute(query);

            expect(result.size).equals(0);
        });

        it("changed parameter exists", async () => {
            let parameters = Map<string, NetworkParameter>();

            const parameterNotChanged = simpleParameter(
                "not_changed",
                "not changed value"
            );
            parameters = parameters.set("not changed", parameterNotChanged);

            const parameterChanged = simpleParameter(
                "changed",
                "changed value"
            );
            parameterChanged.newValue = "changed new value";
            parameters = parameters.set("changed", parameterChanged);

            const query = new GetChanged(parameters);
            const result = handler.execute(query);

            expect(result.size).equals(1);

            const changedParameter = result.get("changed");

            expect(changedParameter).instanceof(NetworkParameter);
            expect(changedParameter.name).equals(parameterChanged.name);
            expect(changedParameter.value).equals(parameterChanged.value);
            expect(changedParameter.newValue).equals(parameterChanged.newValue);
        });
    });

    describe("parameter with children", () => {
        describe("parameter with 1 level children", () => {
            it("should return empty result", async () => {
                let parameters = Map<string, NetworkParameter>();
                const extensions = groupParameterWith1LevelChildren();

                parameters = parameters.set("extensions", extensions);

                const query = new GetChanged(parameters);
                const result = handler.execute(query);

                expect(result.size).equals(0);
            });

            it("should return result with 1 children", async () => {
                let parameters = Map<string, NetworkParameter>();
                const extensions = groupParameterWith1LevelChildren();

                extensions.children.get("max_preimage_size").newValue = 1000000;

                parameters = parameters.set("extensions", extensions);

                const query = new GetChanged(parameters);
                const result = handler.execute(query);

                expect(result.size).equals(1);
                expect(result.has("extensions")).true;

                const changedExtensions = result.get("extensions");

                expect(changedExtensions.children.size).equals(1);
                expect(changedExtensions.children.has("max_preimage_size"))
                    .true;
                expect(changedExtensions.children.has("max_timeout_secs"))
                    .false;

                const maxPreimageSize = changedExtensions.children.get(
                    "max_preimage_size"
                );
                expect(maxPreimageSize.name).equals(
                    extensions.children.get("max_preimage_size").name
                );
                expect(maxPreimageSize.value).equals(
                    extensions.children.get("max_preimage_size").value
                );
                expect(maxPreimageSize.newValue).equals(
                    extensions.children.get("max_preimage_size").newValue
                );
            });
        });

        describe("parameter with 2 level children", () => {
            it("should return empty result", async () => {
                let parameters = Map<string, NetworkParameter>();
                const extensions = extensionsParameter();

                parameters = parameters.set("extensions", extensions);

                const query = new GetChanged(parameters);
                const result = handler.execute(query);

                expect(result.size).equals(0);
            });

            it("should return result with 1 children", async () => {
                let parameters = Map<string, NetworkParameter>();
                const extensions = extensionsParameter();

                extensions.children
                    .get("updatable_htlc_options")
                    .children.get("max_preimage_size").newValue = 1000000;

                parameters = parameters.set("extensions", extensions);

                const query = new GetChanged(parameters);
                const result = handler.execute(query);

                expect(result.size).equals(1);
                expect(result.has("extensions")).true;

                const changedExtensions = result.get("extensions");

                expect(changedExtensions.children.size).equals(1);
                expect(changedExtensions.children.has("updatable_htlc_options"))
                    .true;

                const updatableHtlcOptions = changedExtensions.children.get(
                    "updatable_htlc_options"
                );

                expect(updatableHtlcOptions.children.size).equals(1);
                expect(updatableHtlcOptions.children.has("max_preimage_size"))
                    .true;
                expect(updatableHtlcOptions.children.has("max_timeout_secs"))
                    .false;

                const maxPreimageSize = updatableHtlcOptions.children.get(
                    "max_preimage_size"
                );
                expect(maxPreimageSize.name).equals("max_preimage_size");
                expect(maxPreimageSize.value).equals(1024000);
                expect(maxPreimageSize.newValue).equals(1000000);
            });
        });
    });
});
