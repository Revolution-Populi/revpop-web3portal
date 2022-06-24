import {expect} from "chai";
import stubRepository from "../../../../../../app/Context/Proposal/Infrastructure/StubRepository";
import LoadAll from "../../../../../../app/Context/Proposal/Application/Query/LoadAll/LoadAll";
import {loadAllHandler} from "../../../Utils/Handlers";
import {simpleParameter} from "../../../../../Factory/Parameter";
import {getProposal, ProposalConstructorType} from "../../../Utils/Proposal";
import Proposal from "../../../../../../app/Context/Proposal/Domain/Proposal";
import {getParameter, ParameterConstructorType} from "../../../Utils/Parameter";
import {Set} from "immutable";
import Parameter from "../../../../../../app/Context/Proposal/Domain/Parameter";
import {getOperation} from "../../../Utils/Operation";
import {getOperation as getFeeOperation} from "../../../../Fees/Utilities/Operation";
import {getFees} from "../../../../Fees/Utilities/Fee";

describe("LoadAllHandler", () => {
    afterEach(function() {
        stubRepository.clear();
    });

    describe("execute", () => {
        it("should return correct proposals number", async () => {
            stubRepository.add(getProposal(["1.10.1"]));

            const loadAll = new LoadAll();
            const handler = loadAllHandler();

            const result = await handler.execute(loadAll);

            expect(result.size).equals(1);
        });

        it("should return correct proposals", async () => {
            stubRepository.add(getProposal(["1.10.1"]));

            const loadAll = new LoadAll();
            const handler = loadAllHandler();

            const result = await handler.execute(loadAll);

            assertProposal(result.first(), ["1.10.1"]);
        });

        describe("proposal with changed parameters", () => {
            it("should have correct changed parameters", async () => {
                const props: ProposalConstructorType = [
                    "1.10.1",
                    Set([getParameter(["test1", 1010]), getParameter(["test2", 2000])])
                ];
                stubRepository.add(getProposal(props));

                const loadAll = new LoadAll();
                const handler = loadAllHandler({
                    networkParameters: [simpleParameter("test1", 1000), simpleParameter("test2", 2000)]
                });

                const result = await handler.execute(loadAll);

                assertParameter(result.first().parameters.first(), ["test1", 1010], true);
                assertParameter(result.first().parameters.last(), ["test2", 2000]);
            });

            it("should return proposal with new parameters", async () => {
                const props: ProposalConstructorType = [
                    "1.10.1",
                    Set([getParameter(["test1", 1000]), getParameter(["test2", 2000])])
                ];
                stubRepository.add(getProposal(props));

                const loadAll = new LoadAll();
                const handler = loadAllHandler({
                    networkParameters: [simpleParameter("test1", 1000)]
                });

                const result = await handler.execute(loadAll);

                assertParameter(result.first().parameters.first(), ["test1", 1000]);
                assertParameter(result.first().parameters.last(), ["test2", 2000], false, true);
            });
        });

        describe("proposal with changed fees", () => {
            it("should have correct changed operations", async () => {
                const props: ProposalConstructorType = [
                    "1.10.1",
                    Set(),
                    Set([getOperation(0, {fee1: 200}), getOperation(1, {fee1: 100})])
                ];
                stubRepository.add(getProposal(props));

                const loadAll = new LoadAll();
                const handler = loadAllHandler({
                    operations: [
                        getFeeOperation(0, "operation0", getFees([{code: "fee1", value: 100}])),
                        getFeeOperation(1, "operation1", getFees([{code: "fee1", value: 100}]))
                    ]
                });
                const result = await handler.execute(loadAll);
                const proposal = result.first();

                const operation0 = proposal.operations.first();
                expect(operation0.changed).true;
                expect(operation0.fees[0].value).equals(200);
                expect(operation0.fees[0].networkValue).equals(100);

                const operation1 = proposal.operations.last();
                expect(operation1.changed).false;
                expect(operation1.fees[0].value).equals(100);
                expect(operation1.fees[0].networkValue).null;
            });
        });
    });
});

function assertProposal(proposal: Proposal, props: ProposalConstructorType) {
    expect(proposal.id).equals(props[0]);
}

function assertParameter(parameter: Parameter, props: ParameterConstructorType, changed = false, isNew = false) {
    expect(parameter.name).equals(props[0]);
    expect(parameter.value).equals(props[1]);
    expect(parameter.changed).equals(changed);
    expect(parameter.new).equals(isNew);
}
