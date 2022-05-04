import React, {useEffect, useState} from "react";
import {Table} from "bitshares-ui-style-guide";
import SearchInput from "../../Utility/SearchInput";
import counterpart from "counterpart";
import ParameterActions from "./ParameterActions";
import EditModal from "./EditModal";
import NetworkParametersContext from "./Context";
import networkParametersRepository from "./Repository/NetworkParameters";
import {Map} from "immutable";
import ActionButtons from "./ActionButtons";
import {isNull, toNumber} from "lodash-es";

export default function ParametersList() {
    const [filterByName, setFilterByName] = useState("");
    const [changingParameter, setChangingParameter] = useState(null);
    const [parameters, setParameters] = useState(new Map());

    useEffect(() => {
        const loadParameters = async () => {
            const parameters = await networkParametersRepository.load();
            setParameters(parameters);
        };
        loadParameters().catch(console.error);
    }, []);

    function onChangeFilterByName(event) {
        const value = event.target.value.toLowerCase();
        setFilterByName(value);
    }

    function showEditModal(parameter) {
        setChangingParameter(parameter);
    }

    function saveEditModal(newValue) {
        //TODO:: refactor this and setParameterNewValue function
        const value = isNaN(newValue) ? newValue : toNumber(newValue);
        const path = changingParameter.key.split(".");

        const firstLevelParameterName = path[0];
        const parameter = parameters.get(firstLevelParameterName);

        setParameterNewValue(parameter, path, value);

        setParameters(parameters.set(firstLevelParameterName, parameter));

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

        return parametersForTable
            .map(parameter => {
                return prepareParameter(parameter);
            })
            .toArray();
    }

    function prepareParameter(parameter, parent = null) {
        const preparedParameter = {
            key: isNull(parent)
                ? parameter.name
                : [parent.key, parameter.name].join("."),
            name: parameter.name,
            value: parameter.value,
            newValue: parameter.newValue
        };

        let children;
        let actions;
        if (!parameter.children ?? null) {
            children = null;
            actions = (
                <ParameterActions
                    parameter={preparedParameter}
                    show={showEditModal}
                />
            );
        } else {
            children = parameter.children.map(child =>
                prepareParameter(child, preparedParameter)
            );
            actions = null;
        }

        return Object.assign(preparedParameter, {
            children,
            actions
        });
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

function setParameterNewValue(parameter, path, newValue) {
    if (path.length === 1 && parameter.name === path[0]) {
        parameter.newValue = newValue;
        return;
    }

    if (parameter.children ?? null) {
        path.shift();
        parameter.children.forEach(child =>
            setParameterNewValue(child, path, newValue)
        );
    }
}
