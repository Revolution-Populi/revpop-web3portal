import {expect} from "chai";
import stubRepository from "../../../../../../app/Context/Proposal/Infrastructure/StubRepository";
import LoadAll from "../../../../../../app/Context/Proposal/Application/Query/LoadAll/LoadAll";
import {loadAllHandler} from "../../../Utils/Handlers";
import {simpleParameter} from "../../../../../Factory/Parameter";
import {getProposal} from "../../../Utils/Proposal";

describe("LoadAllHandler", () => {
    afterEach(function() {
        stubRepository.clear();
    });

    describe("execute", () => {
        it("should return proposal with changed parameters", async () => {
            stubRepository.add(getProposal("1.10.1"));

            const loadAll = new LoadAll();
            const handler = loadAllHandler(
                simpleParameter("test1", 1000),
                simpleParameter("test2", 2000)
            );

            handler.execute(loadAll);
        });
    });
});
