import React from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import ProposalRepository from "../Repository/Proposal";

export default function ActionButtons({proposals, selectedProposals, clear}) {
    function onSave() {
        ProposalRepository.vote(proposals, selectedProposals);
    }

    function onReset() {
        clear();
    }

    return (
        <>
            <Button
                type="primary"
                onClick={onSave}
                disabled={selectedProposals.isEmpty()}
            >
                <Translate content="account.votes.publish" />
            </Button>
            <Button
                className="reset"
                onClick={onReset}
                disabled={selectedProposals.isEmpty()}
            >
                <Translate content="account.perm.reset" />
            </Button>
        </>
    );
}
