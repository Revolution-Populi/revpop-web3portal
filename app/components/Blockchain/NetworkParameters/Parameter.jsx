import React from "react";
import {Button} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";
import NetworkParametersContext from "./Context";

export default class ParameterActions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false
        };

        this.onEdit = this.onEdit.bind(this);
    }

    onEdit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <NetworkParametersContext.Consumer>
                {({isVisibleEditModal, showEditModal}) => (
                    <Button
                        type="primary"
                        onClick={() => {
                            showEditModal(this.props.parameter);
                        }}
                        disabled={isVisibleEditModal}
                    >
                        <Translate content="network_parameters.edit" />
                    </Button>
                )}
            </NetworkParametersContext.Consumer>
        );
    }
}
