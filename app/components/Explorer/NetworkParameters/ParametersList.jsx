import React, {useEffect, useState} from "react";
import {Table} from "bitshares-ui-style-guide";
import SearchInput from "../../Utility/SearchInput";
import counterpart from "counterpart";
import EditModal from "./EditModal";
import NetworkParametersContext from "./Context";
import {Map} from "immutable";
import ActionButtons from "./ActionButtons";
import LoadAllHandler from "../../../Context/NetworkParameters/Application/Query/LoadAll/LoadAllHandler";
import blockchainRepository from "../../../Context/NetworkParameters/Infrastructure/BlockchainRepository";
import LoadAll from "../../../Context/NetworkParameters/Application/Query/LoadAll/LoadAll";
import ParameterToTableRowTransformer from "./ParameterToTableRowTransformer";
import UpdateParameter from "../../../Context/NetworkParameters/Application/Commands/UpdateParameter/UpdateParameter";
import UpdateParameterHandler from "../../../Context/NetworkParameters/Application/Commands/UpdateParameter/UpdateParameterHandler";

export default function ParametersList() {
    const [filterByName, setFilterByName] = useState("");
    const [changingParameter, setChangingParameter] = useState(null);
    const [parameters, setParameters] = useState(new Map());

    useEffect(() => {
        const loadParameters = async () => {
            const query = new LoadAll();
            const parameters = await new LoadAllHandler(
                blockchainRepository
            ).execute(query);
            console.log(parameters);
            setParameters(parameters);
        };
        loadParameters();
    }, []);

    function onChangeFilterByName(event) {
        const value = event.target.value.toLowerCase();
        setFilterByName(value);
    }

    function showEditModal(parameter) {
        setChangingParameter(parameter);
    }

    function saveEditModal(newValue) {
        const command = new UpdateParameter(
            parameters,
            changingParameter.key,
            newValue
        );
        const changedParameters = new UpdateParameterHandler().execute(command);
        setParameters(changedParameters);
        setChangingParameter(null);
    }

    function cancelEditModal() {
        setChangingParameter(null);
    }

    const columns = [
        {
            key: "name",
            title: counterpart.translate("network_parameters.name"),
            dataIndex: "name"
        },
        {
            key: "description",
            title: counterpart.translate("network_parameters.description"),
            dataIndex: "description"
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
        },
        {
            key: "actions",
            dataIndex: "actions"
        }
    ];

    function prepareParameters() {
        let parametersForTable = parameters;

        if (filterByName !== "") {
            parametersForTable = parameters.filter(parameter =>
                parameter.name.includes(filterByName)
            );
        }

        const parameterToTableRowTransformer = new ParameterToTableRowTransformer(
            showEditModal
        );

        return parametersForTable
            .map(parameter => {
                return parameterToTableRowTransformer.transform(parameter);
            })
            .toArray();
    }

    return (
        <NetworkParametersContext.Provider
            value={{
                parameters: parameters
            }}
        >
            <div className="search-actions">
                <div className="search">
                    <SearchInput
                        placeholder={counterpart.translate(
                            "network_parameters.filter_by_name"
                        )}
                        value={filterByName}
                        onChange={onChangeFilterByName}
                    />
                </div>

                <div className="actions">
                    <ActionButtons />
                </div>
            </div>

            <EditModal
                changingParameter={changingParameter}
                save={saveEditModal}
                cancel={cancelEditModal}
            />
            <Table
                columns={columns}
                dataSource={prepareParameters()}
                pagination={false}
            />
        </NetworkParametersContext.Provider>
    );
}
