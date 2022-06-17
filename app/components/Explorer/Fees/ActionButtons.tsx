import React, {useState} from "react";
// @ts-ignore
import {Button} from "bitshares-ui-style-guide";
// @ts-ignore
import Translate from "react-translate-component";
import CreateProposalModal from "./CreateProposalModal/CreateProposalModal";

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
            <CreateProposalModal
                isVisible={isVisible}
                close={closeModal}
                // onProposalCreated={onProposalCreated}
            />
            <Button
                type="primary"
                className="create-proposal"
                onClick={showModal}
            >
                <Translate content="fees.create_proposal.button" />
            </Button>
        </>
    );
}
