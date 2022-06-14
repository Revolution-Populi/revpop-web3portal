import {expect} from "chai";
import {Set} from "immutable";
import RevokeVote from "../../../../../../app/Context/Proposal/Application/Commands/RevokeVote/RevokeVote";
import RevokeVoteHandler from "../../../../../../app/Context/Proposal/Application/Commands/RevokeVote/RevokeVoteHandler";
import stubRepository from "../../../../../../app/Context/Proposal/Infrastructure/StubRepository";
import {getProposal} from "../../../Utils/Proposal";
import {ProposalTypes} from "../../../../../../app/Context/Proposal/types";
import ProposalsType = ProposalTypes.ProposalsType;

describe("Vote", () => {
    let handler: RevokeVoteHandler;

    beforeEach(function() {
        handler = new RevokeVoteHandler(stubRepository);
    });

    describe("execute", () => {
        describe("should return success result", () => {
            it("should return success result", async () => {
                const proposal = getProposal("1.10.1");
                const proposals = Set([proposal]);

                const command = new RevokeVote(proposals, "1.10.1");
                const result = await handler.execute(command);

                expect(result.isSuccess()).true;
            });

            it("should update proposal voted parameter", async () => {
                const proposal = getProposal("1.10.1");
                proposal.setVoted();
                const proposals = Set([proposal]);

                const command = new RevokeVote(proposals, "1.10.1");
                const proposalsOrError = await handler.execute(command);

                if (proposalsOrError.isFailure()) {
                    throw new Error();
                }

                const resultProposals = (proposalsOrError.value as unknown) as ProposalsType;

                expect(resultProposals.size).equals(1);
                expect(proposal.voted).false;
            });
        });
    });
});
