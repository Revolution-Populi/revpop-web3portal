import React from "react";
import {Apis} from "@revolutionpopuli/revpopjs-ws";
import Parameter from "./Parameter";
import {Card, Table} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import {isObject} from "lodash-es";
import SearchInput from "../../Utility/SearchInput";
import counterpart from "counterpart";

class ParametersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parameters: {},
            filter: {
                byName: ""
            }
        };
    }

    async componentDidMount() {
        this.setState({
            parameters: (
                await Apis.instance()
                    .db_api()
                    .exec("get_global_properties", [])
            ).parameters
        });
    }

    onFilter(event) {
        const value = event.target.value.toLowerCase();
        this.setState(state => ({
            filter: {...state.filter, byName: value}
        }));
    }

    render() {
        const parameters = this.state.parameters;
        let parametersKeys = Object.keys(parameters);
        if (this.state.filter.byName !== "") {
            parametersKeys = parametersKeys.filter(key =>
                key.includes(this.state.filter.byName)
            );
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
            }
        ];

        const rows = parametersKeys.map(parameter => {
            return {
                key: parameter,
                name: parameter,
                value: !isObject(parameters[parameter])
                    ? parameters[parameter]
                    : "Object"
            };
        });

        return (
            <div>
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

                <Table columns={columns} dataSource={rows} pagination={false} />
            </div>
        );
    }
}

export default ParametersList;
