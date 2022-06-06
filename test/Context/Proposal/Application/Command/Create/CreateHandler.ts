import {expect} from "chai";
import NetworkParameter from "../../../../../../app/Context/NetworkParameters/Domain/NetworkParameter";
import {Map} from "immutable";
import CreateHandler from "../../../../../../app/Context/Proposal/Application/Commands/Create/CreateHandler";
import Create from "../../../../../../app/Context/Proposal/Application/Commands/Create/Create";
import stubRepository from "../../../../../../app/Context/Proposal/Infrastructure/StubRepository";
import moment from "moment";
import {
    extensionsParameter,
    linkParameter
} from "../../../../../Factory/Parameter";
import {Proposals} from "../../../../../../app/Context/Proposal/Domain/RepositoryInterface";

describe("CreateHandler", () => {
    let handler: CreateHandler;
    let parameters: Map<string, NetworkParameter> = Map();
    const expirationTime = moment().add(10, "days");

    beforeEach(function() {
        handler = new CreateHandler(stubRepository);
    });

    afterEach(function() {
        parameters = parameters.clear();
        stubRepository.clear();
    });

    describe("execute", () => {
        describe("parameters without children", async () => {
            describe.skip("and without changes", async () => {
                it("should throw exception", async () => {
                    const parameter = new NetworkParameter("test name");
                    parameter.value = "test value";
                    parameters = parameters.set("test name", parameter);

                    const command = new Create(parameters, expirationTime);

                    await expect(handler.execute(command)).rejectedWith(Error);
                });
            });

            describe("parameters with changes", async () => {
                it("should create proposal with one old and one changed parameter", async () => {
                    const parameter = new NetworkParameter("test_name");
                    parameter.value = "test value";
                    parameters = parameters.set("test_name", parameter);

                    const changedParameter = new NetworkParameter(
                        "changed_parameter"
                    );
                    changedParameter.value = "old value";
                    changedParameter.newValue = "new value";
                    parameters = parameters.set(
                        "changed_parameter",
                        changedParameter
                    );

                    const command = new Create(parameters, expirationTime);
                    const result = await handler.execute(command);

                    expect(result).true;

                    const proposals = await stubRepository.loadAll();
                    expect(proposals.size).equals(1);

                    const proposal = proposals.first();
                    expect(proposal.expiration_time).lte(864000);

                    expect(proposal.parameters).eql({
                        test_name: "test value",
                        changed_parameter: "new value"
                    });
                });
            });
        });

        describe("link parameter", async () => {
            it("should return valid object", async () => {
                const currentFees = linkParameter();
                parameters = parameters.set(currentFees.name, currentFees);

                const command = new Create(parameters, expirationTime);

                const result = await handler.execute(command);
                expect(result).true;

                const proposals = await stubRepository.loadAll();
                expect(proposals.size).equals(1);

                const proposal = proposals.first();
                expect(proposal.parameters).eql({
                    current_fees: currentFees.linkValue
                });
            });
        });

        describe("parameters with children", async () => {
            describe.skip("and without changes", async () => {
                it("should throw exception", async () => {
                    const parameter = extensionsParameter();
                    parameters = parameters.set(parameter.name, parameter);

                    const command = new Create(parameters, expirationTime);

                    await expect(handler.execute(command)).rejectedWith(Error);
                });
            });

            describe("and with changes", async () => {
                it("should create proposal with one old and one changed parameter", async () => {
                    const parameter = extensionsParameter();
                    parameter.children
                        .get("updatable_htlc_options")
                        .children.get("max_timeout_secs").newValue = 1000;

                    parameters = parameters.set(parameter.name, parameter);

                    const command = new Create(parameters, expirationTime);
                    const result = await handler.execute(command);
                    expect(result).true;

                    const proposals = await stubRepository.loadAll();
                    expect(proposals.size).equals(1);

                    const proposal = proposals.first();
                    expect(proposal.expiration_time).lte(864000);

                    expect(proposal.parameters).eql({
                        extensions: {
                            updatable_htlc_options: {
                                max_preimage_size: 1024000,
                                max_timeout_secs: 1000
                            }
                        }
                    });
                });
            });
        });
    });
});
