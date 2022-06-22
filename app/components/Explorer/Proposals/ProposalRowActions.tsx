import React from "react";
// @ts-ignore
import {Button} from "bitshares-ui-style-guide";
// @ts-ignore
import Translate from "react-translate-component";
import Proposal from "../../../Context/Proposal/Domain/Proposal";
import {RevokeVote, revokeVoteHandler, Vote, voteHandler} from "../../../Context/Proposal";

type PropsType = {
    proposal: Proposal;
};

export default function RowActions({proposal}: PropsType) {
    async function onVoteHandler() {
        const command = new Vote(proposal);
        const proposalsOrError = await voteHandler.execute(command);

        if (proposalsOrError.isFailure()) {
            //TODO:: show error
            return null;
        }
    }

    async function onRevokeHandler() {
        const command = new RevokeVote(proposal);
        const proposalsOrError = await revokeVoteHandler.execute(command);

        if (proposalsOrError.isFailure()) {
            //TODO:: show error
            return null;
        }
    }

    if (proposal.voted) {
        return (
            <Button type="primary" onClick={onRevokeHandler}>
                <Translate content="proposals.revoke" />
            </Button>
        );
    }

    return (
        <Button type="primary" onClick={onVoteHandler}>
            <Translate content="proposals.vote" />
        </Button>
    );
}
