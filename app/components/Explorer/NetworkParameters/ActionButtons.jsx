import React, {useContext, useState} from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import CreateProposalModal from "./CreateProposalModal/CreateProposalModal";
import NetworkParametersContext from "./Context";

export default function ActionButtons({onProposalCreated}) {
    const {parameters} = useContext(NetworkParametersContext);
    const [isVisible, setIsVisible] = useState(false);

    function showModal() {
        setIsVisible(true);
    }

    function closeModal() {
        setIsVisible(false);
    }

    function existsEditedParameters() {
        return (
            parameters.find(parameter => parameter.isModified()) !== undefined
        );
    }

    return (
        <>
            <CreateProposalModal
                isVisible={isVisible}
                close={closeModal}
                onProposalCreated={onProposalCreated}
            />
            <Button
                type="primary"
                className="create-proposal"
                disabled={!existsEditedParameters()}
                onClick={showModal}
            >
                <Translate content="network_parameters.create_proposal.button" />
            </Button>
        </>
    );
}
