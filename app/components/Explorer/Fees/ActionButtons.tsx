import React, {useContext, useState} from "react";
// @ts-ignore
import {Button} from "bitshares-ui-style-guide";
// @ts-ignore
import Translate from "react-translate-component";
import FeesContext from "./Context";
import CreateProposalModal from "./CreateProposalModal/CreateProposalModal";

export default function ActionButtons() {
    const {operations} = useContext(FeesContext);
    const [isVisible, setIsVisible] = useState(false);

    function showModal() {
        setIsVisible(true);
    }

    function closeModal() {
        setIsVisible(false);
    }

    function existsEditedFees() {
        return (
            Object.values(operations).find(operation => operation.updated) !==
            undefined
        );
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
                disabled={!existsEditedFees()}
                onClick={showModal}
            >
                <Translate content="fees.create_proposal.button" />
            </Button>
        </>
    );
}
