import React, {useContext} from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import ProposalsContext from "./Context";
import {
    RevokeVote,
    revokeVoteHandler,
    Vote,
    voteHandler
} from "../../../../Context/Proposal";

export default function RowActions({proposal}) {
    const {proposals, setProposals} = useContext(ProposalsContext);

    async function onVoteHandler() {
        const command = new Vote(proposals, proposal.id);
        const proposalsOrError = await voteHandler.execute(command);

        if (proposalsOrError.isFailure()) {
            return null;
        }

        setProposals(proposalsOrError.value);
    }

    async function onRevokeHandler() {
        const command = new RevokeVote(proposals, proposal.id);
        const proposalsOrError = await revokeVoteHandler.execute(command);

        if (proposalsOrError.isFailure()) {
            return null;
        }

        setProposals(proposalsOrError.value);
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
