import React, {useState} from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import CreateProposalModal from "./CreateProposalModal";

export default function ActionButtons() {
    const [isVisible, setIsVisible] = useState(false);

    function showModal() {
        setIsVisible(true);
    }

    function closeModal() {
        setIsVisible(false);
    }

    return (
        <>
            <CreateProposalModal isVisible={isVisible} close={closeModal} />
            <Button type="primary" onClick={showModal}>
                <Translate content="network_parameters.create_proposal.button" />
            </Button>
        </>
    );
}
