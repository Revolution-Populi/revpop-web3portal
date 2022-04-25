import React from "react";
import {Form, Modal, Input} from "bitshares-ui-style-guide";
import NetworkParametersContext from "./Context";

class EditModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newValue: ""
        };
    }

    componentDidMount() {
        const newValue = this.context.changingParameter
            ? this.context.changingParameter.newValue
            : "";
        this.setState({
            newValue: newValue
        });
    }

    onChangeNewValue(event) {
        this.setState({
            newValue: event.currentTarget.value
        });
    }

    render() {
        return (
            <NetworkParametersContext.Consumer>
                {({changingParameter, saveEditModal, cancelEditModal}) => (
                    <Modal
                        title={changingParameter ? changingParameter.name : ""}
                        visible={this.props.isVisible}
                        onOk={() => {
                            saveEditModal(this.state.newValue);
                        }}
                        onCancel={() => {
                            cancelEditModal();
                        }}
                    >
                        {changingParameter !== undefined && (
                            <>
                                <div>Value: {changingParameter.value}</div>
                                <Form.Item label="New value">
                                    <Input
                                        defaultValue={
                                            changingParameter.newValue
                                        }
                                        onChange={event => {
                                            this.onChangeNewValue(
                                                event,
                                                changingParameter
                                            );
                                        }}
                                    />
                                </Form.Item>
                            </>
                        )}
                    </Modal>
                )}
            </NetworkParametersContext.Consumer>
        );
    }
}

EditModal.contextType = NetworkParametersContext;

export default EditModal;
