import React from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import ProposalRepository from "../Repository/Proposal";

export default function RowActions({proposal}) {
    function onSave() {
        ProposalRepository.vote(proposal);
    }

    return (
        <Button
            type="primary"
            onClick={() => {
                onSave(proposal);
            }}
        >
            <Translate content="network_parameters.proposals.vote" />
        </Button>
    );
}
