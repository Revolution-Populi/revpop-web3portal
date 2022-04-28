import React, {useContext, useState} from "react";
import counterpart from "counterpart";
import {Modal} from "bitshares-ui-style-guide";
import proposalRepository from "./Repository/Proposal";
import NetworkParametersContext from "./Context";
import Translate from "react-translate-component";

export default function CreateProposalModal({isVisible, close}) {
    const [saveEmptyError, setSaveEmptyError] = useState(false);
    const {parameters} = useContext(NetworkParametersContext);

    function save() {
        const parametersToSave = parameters.filter(
            parameter => parameter.newValue !== undefined
        );

        if (parametersToSave.isEmpty()) {
            setSaveEmptyError(true);
            return;
        }

        proposalRepository.create(parametersToSave);
    }

    function onClose() {
        setSaveEmptyError(false);
        close();
    }

    return (
        <Modal
            title={counterpart.translate(
                "network_parameters.create_proposal.modal_title"
            )}
            visible={isVisible}
            onOk={save}
            onCancel={onClose}
        >
            {saveEmptyError && (
                <div>
                    <Translate content="network_parameters.create_proposal.errors.empty" />
                </div>
            )}
            Add table with parameters to change?
        </Modal>
    );
}
