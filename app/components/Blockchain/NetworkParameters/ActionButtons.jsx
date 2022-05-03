import React, {useContext, useState} from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import AddNewParameterModal from "./AddNewParameterModal/AddNewParameterModal";
import CreateProposalModal from "./CreateProposalModal/CreateProposalModal";
import NetworkParametersContext from "./Context";

export default function ActionButtons() {
    const {parameters} = useContext(NetworkParametersContext);
    const [isVisible, setIsVisible] = useState(false);
    const [
        isVisibleAddNewParameterModal,
        setIsVisibleAddNewParameterModal
    ] = useState(false);

    function showAddParameterModal() {
        setIsVisibleAddNewParameterModal(true);
    }

    function closeAddParameterModal() {
        setIsVisibleAddNewParameterModal(false);
    }

    function showModal() {
        setIsVisible(true);
    }

    function closeModal() {
        setIsVisible(false);
    }

    function existsEditedParameters() {
        return (
            parameters.find(parameter => parameter.newValue !== undefined) !==
            undefined
        );
    }

    return (
        <>
            <AddNewParameterModal
                isVisible={isVisibleAddNewParameterModal}
                close={closeAddParameterModal}
            />
            <Button
                type="primary"
                className="add-parameter"
                onClick={showAddParameterModal}
            >
                <Translate content="network_parameters.list.add" />
            </Button>

            <CreateProposalModal isVisible={isVisible} close={closeModal} />
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
