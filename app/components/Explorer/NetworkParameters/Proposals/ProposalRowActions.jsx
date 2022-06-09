import React from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import {
    RevokeVote,
    revokeVoteHandler,
    Vote,
    voteHandler
} from "../../../../Context/Proposal";

export default function RowActions({proposal}) {
    function onVoteHandler() {
        const command = new Vote(proposal.id);
        voteHandler.execute(command);
    }

    function onRevokeHandler() {
        const command = new RevokeVote(proposal.id);
        revokeVoteHandler.execute(command);
    }

    if (proposal.voted) {
        return (
            <Button type="primary" onClick={onRevokeHandler}>
                <Translate content="network_parameters.proposals.revoke" />
            </Button>
        );
    }

    return (
        <Button type="primary" onClick={onVoteHandler}>
            <Translate content="network_parameters.proposals.vote" />
        </Button>
    );
}
