import {expect} from "chai";
import Vote from "../../../../../../app/Context/Proposal/Application/Commands/Vote/Vote";
import VoteHandler from "../../../../../../app/Context/Proposal/Application/Commands/Vote/VoteHandler";
import stubRepository from "../../../../../../app/Context/Proposal/Infrastructure/StubRepository";
import {getProposal} from "../../../Utils/Proposal";

describe("Vote", () => {
    let handler: VoteHandler;

    beforeEach(function() {
        handler = new VoteHandler(stubRepository);
    });

    describe("execute", () => {
        describe("should return success result", () => {
            it("should return success result", async () => {
                const proposal = getProposal([]);

                const command = new Vote(proposal);
                const proposalOrError = await handler.execute(command);

                expect(proposalOrError.isSuccess()).true;
            });

            it("should update proposal voted parameter", async () => {
                const proposal = getProposal([]);

                const command = new Vote(proposal);
                const proposalOrError = await handler.execute(command);

                if (proposalOrError.isFailure()) {
                    throw new Error();
                }

                expect(proposalOrError.value.voted).true;
            });
        });
    });
});
