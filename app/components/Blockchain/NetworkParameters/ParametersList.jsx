import React from "react";
import {Table} from "bitshares-ui-style-guide";
import {isObject} from "lodash-es";
import SearchInput from "../../Utility/SearchInput";
import counterpart from "counterpart";
import ParameterActions from "./Parameter";
import EditModal from "./EditModal";
import NetworkParametersContext from "./Context";
import repository from "./Repository";
import {Map} from "immutable";

class ParametersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parameters: new Map(),
            changingParameter: undefined,
            filter: {
                byName: ""
            },
            showEditModal: false
        };

        this.showEditModal = this.showEditModal.bind(this);
        this.saveEditModal = this.saveEditModal.bind(this);
        this.cancelEditModal = this.cancelEditModal.bind(this);
    }

    async componentDidMount() {
        const parameters = await repository.load();

        this.setState({
            parameters: new Map(Object.entries(parameters))
        });
    }

    onFilter(event) {
        const value = event.target.value.toLowerCase();
        this.setState(state => ({
            filter: {...state.filter, byName: value}
        }));
    }

    prepareParameters() {
        let parameters = Array.from(this.state.parameters, ([key, value]) => {
            return {
                name: key,
                value: value.value,
                newValue: value.newValue
            };
        });

        if (this.state.filter.byName !== "") {
            parameters = parameters.filter(parameter =>
                parameter.name.includes(this.state.filter.byName)
            );
        }

        return parameters.map(parameter => {
            return {
                key: parameter.name,
                name: parameter.name,
                value: !isObject(parameter.value) ? parameter.value : "Object",
                newValue: parameter.newValue,
                actions: <ParameterActions parameter={parameter} />
            };
        });
    }

    showEditModal(parameter) {
        this.setState({
            isVisibleEditModal: true,
            changingParameter: parameter
        });
    }

    saveEditModal(newValue) {
        this.setState({
            isVisibleEditModal: false
        });

        this.setState(state => ({
            parameters: state.parameters.set(state.changingParameter.name, {
                ...state.changingParameter,
                ...{newValue}
            }),
            changingParameter: undefined
        }));
    }

    cancelEditModal() {
        this.setState({
            isVisibleEditModal: false
        });
    }

    render() {
        const rows = this.prepareParameters();

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

        return (
            <NetworkParametersContext.Provider
                value={{
                    isVisibleEditModal: false,
                    changingParameter: this.state.changingParameter,
                    showEditModal: this.showEditModal,
                    saveEditModal: this.saveEditModal,
                    cancelEditModal: this.cancelEditModal
                }}
            >
                <SearchInput
                    placeholder={counterpart.translate(
                        "network_parameters.filter_by_name"
                    )}
                    value={this.state.filter.byName}
                    onChange={this.onFilter.bind(this)}
                    style={{
                        width: "200px",
                        marginBottom: "12px",
                        marginTop: "4px"
                    }}
                />

                <EditModal isVisible={this.state.isVisibleEditModal} />
                <Table columns={columns} dataSource={rows} pagination={false} />
            </NetworkParametersContext.Provider>
        );
    }
}

ParametersList.contextType = NetworkParametersContext;

export default ParametersList;
