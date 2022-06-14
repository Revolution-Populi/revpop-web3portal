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

        it("should return proposal with changed parameters", async () => {
            const props: ProposalConstructorType = [
                "1.10.1",
                Set([
                    getParameter(["test1", 1010]),
                    getParameter(["test2", 2000])
                ])
            ];
            stubRepository.add(getProposal(props));

            const loadAll = new LoadAll();
            const handler = loadAllHandler(
                simpleParameter("test1", 1000),
                simpleParameter("test2", 2000)
            );

            const result = await handler.execute(loadAll);

            assertParameter(
                result.first().parameters.first(),
                ["test1", 1010],
                true
            );
            assertParameter(result.first().parameters.last(), ["test2", 2000]);
        });

        it("should return proposal with new parameters", async () => {
            const props: ProposalConstructorType = [
                "1.10.1",
                Set([
                    getParameter(["test1", 1000]),
                    getParameter(["test2", 2000])
                ])
            ];
            stubRepository.add(getProposal(props));

            const loadAll = new LoadAll();
            const handler = loadAllHandler(simpleParameter("test1", 1000));

            const result = await handler.execute(loadAll);

            assertParameter(result.first().parameters.first(), ["test1", 1000]);
            assertParameter(
                result.first().parameters.last(),
                ["test2", 2000],
                false,
                true
            );
        });
    });
});

function assertProposal(proposal: Proposal, props: ProposalConstructorType) {
    expect(proposal.id).equals(props[0]);
}

function assertParameter(
    parameter: Parameter,
    props: ParameterConstructorType,
    changed = false,
    isNew = false
) {
    expect(parameter.name).equals(props[0]);
    expect(parameter.value).equals(props[1]);
    expect(parameter.changed).equals(changed);
    expect(parameter.new).equals(isNew);
}
