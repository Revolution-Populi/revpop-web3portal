import ParameterToTableRowTransformer, {
    TableRow
} from "../../../app/components/Explorer/NetworkParameters/ParameterToTableRowTransformer";
import NetworkParameter from "../../../app/Context/NetworkParameters/Domain/NetworkParameter";
import {expect} from "chai";
import {extensionsParameter} from "../../Factory/Parameter";

describe("ParameterToTableRowTransformer", () => {
    let parameterToTableRowTransformer: ParameterToTableRowTransformer;

    before(function() {
        parameterToTableRowTransformer = new ParameterToTableRowTransformer(
            () => {}
        );
    });

    describe("transform", () => {
        it("normal parameter", async () => {
            const parameter = new NetworkParameter("test name");
            parameter.value = "test value";
            parameter.newValue = "test new value";

            const result = parameterToTableRowTransformer.transform(parameter);

            expect(result.key).equals(parameter.name);
            expect(result.name).equals(parameter.name);
            expect(result.rawValue).equals(parameter.value);
            expect(result.rawNewValue).equals(parameter.newValue);
            expect(result.children).null;
        });

        it("link parameter (fees)", async () => {
            const parameter = new NetworkParameter("test name");
            parameter.link = "test value";

            const result = parameterToTableRowTransformer.transform(parameter);

            expect(result.key).equals(parameter.name);
            expect(result.name).equals(parameter.name);
            expect(result.value).null;
            expect(result.link).equals(parameter.link);
            expect(result.children).null;
        });

        it("group parameter (extensions)", async () => {
            const extensionParameter = extensionsParameter();

            const result = parameterToTableRowTransformer.transform(
                extensionParameter
            );

            expect(result.key).equals("extensions");
            expect(result.name).equals("extensions");
            expect(result.value).null;
            expect(result.link).null;
            expect(result.children).length(1);

            const updatableHtlcOptions = result.children?.[0] as TableRow;
            expect(updatableHtlcOptions.key).equals(
                "extensions.updatable_htlc_options"
            );
            expect(updatableHtlcOptions.name).equals("updatable_htlc_options");
            expect(updatableHtlcOptions.children).length(2);

            const maxPreimageSize = updatableHtlcOptions
                .children?.[0] as TableRow;
            expect(maxPreimageSize.key).equals(
                "extensions.updatable_htlc_options.max_preimage_size"
            );
            expect(maxPreimageSize.name).equals("max_preimage_size");
            expect(maxPreimageSize.rawValue).equals(1024000);
            expect(maxPreimageSize.children).null;

            const maxTimeoutSecs = updatableHtlcOptions
                .children?.[1] as TableRow;
            expect(maxTimeoutSecs.key).equals(
                "extensions.updatable_htlc_options.max_timeout_secs"
            );
            expect(maxTimeoutSecs.name).equals("max_timeout_secs");
            expect(maxTimeoutSecs.rawValue).equals(2592000);
            expect(maxTimeoutSecs.children).null;
        });
    });
});
