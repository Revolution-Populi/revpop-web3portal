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
import {isObject, toNumber} from "lodash-es";

export default function ParametersList() {
    const [filterByName, setFilterByName] = useState("");
    const [changingParameter, setChangingParameter] = useState(null);
    const [parameters, setParameters] = useState(new Map());

    useEffect(() => {
        const loadParameters = async () => {
            const parameters = await networkParametersRepository.load();
            setParameters(new Map(Object.entries(parameters)));
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
        const value = isNaN(newValue) ? newValue : toNumber(newValue);

        setParameters(
            parameters.set(changingParameter.name, {
                ...changingParameter,
                ...{newValue: value}
            })
        );

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
                return {
                    key: parameter.name,
                    name: parameter.name,
                    value: !isObject(parameter.value)
                        ? parameter.value
                        : "Object",
                    newValue: parameter.newValue,
                    actions: (
                        <ParameterActions
                            parameter={parameter}
                            show={showEditModal}
                        />
                    )
                };
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
