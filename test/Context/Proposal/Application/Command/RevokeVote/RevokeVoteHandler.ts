import {expect} from "chai";
import RevokeVote from "../../../../../../app/Context/Proposal/Application/Commands/RevokeVote/RevokeVote";
import RevokeVoteHandler from "../../../../../../app/Context/Proposal/Application/Commands/RevokeVote/RevokeVoteHandler";
import stubRepository from "../../../../../../app/Context/Proposal/Infrastructure/StubRepository";
import {getProposal} from "../../../Utils/Proposal";

describe("Vote", () => {
    let handler: RevokeVoteHandler;

    beforeEach(function() {
        handler = new RevokeVoteHandler(stubRepository);
    });

    describe("execute", () => {
        describe("should return success result", () => {
            it("should return success result", async () => {
                const proposal = getProposal(["1.10.1"]);

                const command = new RevokeVote(proposal);
                const proposalsOrError = await handler.execute(command);

                expect(proposalsOrError.isSuccess()).true;
            });

            it("should update proposal voted parameter", async () => {
                const proposal = getProposal(["1.10.1"]);
                proposal.setVoted();

                const command = new RevokeVote(proposal);
                const proposalsOrError = await handler.execute(command);

                if (proposalsOrError.isFailure()) {
                    throw new Error();
                }

                expect(proposalsOrError.value.voted).false;
            });
        });
    });
});
