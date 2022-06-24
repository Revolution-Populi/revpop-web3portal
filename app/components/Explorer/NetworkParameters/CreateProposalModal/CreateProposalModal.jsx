import React, {useContext, useState} from "react";
import counterpart from "counterpart";
import {Modal, Table} from "bitshares-ui-style-guide";
import NetworkParametersContext from "../Context";
import Translate from "react-translate-component";
import moment from "moment";
import GetChanged from "../../../../Context/NetworkParameters/Application/Query/GetChanged/GetChanged";
import GetChangedHandler from "../../../../Context/NetworkParameters/Application/Query/GetChanged/GetChangedHandler";
import ParameterToTableRowTransformer from "../ParameterToTableRowTransformer";
import ExpirationDate from "../../../Common/ExpirationDate";
import {CreateProposal, createProposalHandler} from "../../../../Context/NetworkParameters";

export default function CreateProposalModal({isVisible, close, onProposalCreated}) {
    const [expirationDate, setExpirationDate] = useState(moment().add(1, "days"));
    const [saveEmptyError, setSaveEmptyError] = useState(false);
    const {parameters} = useContext(NetworkParametersContext);

    const columns = [
        {
            key: "name",
            title: counterpart.translate("network_parameters.name"),
            dataIndex: "name"
        },
        {
            key: "value",
            title: counterpart.translate("network_parameters.value"),
            dataIndex: "value"
        },
        {
            key: "newValue",
            title: counterpart.translate("network_parameters.new_value"),
            dataIndex: "newValue"
        }
    ];

    function data() {
        const query = new GetChanged(parameters);
        const handler = new GetChangedHandler();
        const parametersForTable = handler.execute(query);

        const parameterToTableRowTransformer = new ParameterToTableRowTransformer(() => {});

        return parametersForTable
            .map(parameter => {
                return parameterToTableRowTransformer.transform(parameter);
            })
            .toArray();
    }

    async function save() {
        const command = new CreateProposal(parameters, expirationDate);
        const result = await createProposalHandler.execute(command);

        if (result.isSuccess()) {
            close();
            onProposalCreated();
        }
    }

    function onClose() {
        setSaveEmptyError(false);
        close();
    }

    function onDateChange(date) {
        setExpirationDate(date);
    }

    return (
        <Modal
            title={counterpart.translate("network_parameters.create_proposal.modal_title")}
            className="create-proposal-modal"
            visible={isVisible}
            onOk={save}
            onCancel={onClose}
        >
            {saveEmptyError && (
                <div>
                    <Translate content="network_parameters.create_proposal.errors.empty" />
                </div>
            )}
            <Table columns={columns} className="list" dataSource={data()} pagination={false} />
            <ExpirationDate onChange={onDateChange} />
        </Modal>
    );
}
