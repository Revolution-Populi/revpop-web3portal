import React from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import {proposalRepository} from "../../../../Context/Proposal";

export default function RowActions({proposal}) {
    function onSave() {
        proposalRepository.vote(proposal);
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
