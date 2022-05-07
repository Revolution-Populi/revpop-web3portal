import React, {useState} from "react";
import {Form, Modal} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import TableTemplate from "./ParameterValue/TableTemplate";
import EditTemplate from "./ParameterValue/EditTemplate";

export default function EditModal({changingParameter, save, cancel}) {
    const [newValue, setNewValue] = useState(null);

    const isVisible = changingParameter !== null;
    if (!isVisible) {
        return null;
    }

    function onChangeNewValue(value) {
        setNewValue(value);
    }

    function onSave() {
        setNewValue(null);
        save(newValue);
    }

    function onCancel() {
        setNewValue(null);
        cancel();
    }

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8}
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16}
        }
    };

    return (
        <Modal
            title={counterpart.translate(
                "network_parameters.edit_modal.title",
                {
                    name: changingParameter.name
                }
            )}
            className="edit-parameter-modal"
            visible={isVisible}
            onOk={onSave}
            onCancel={onCancel}
        >
            <Form.Item
                label={counterpart.translate(
                    "network_parameters.edit_modal.value"
                )}
                className="value"
                {...formItemLayout}
            >
                <TableTemplate
                    type={changingParameter.type}
                    value={changingParameter.rawValue}
                />
            </Form.Item>

            <Form.Item
                label={counterpart.translate(
                    "network_parameters.edit_modal.new_value"
                )}
                className="new-value"
                {...formItemLayout}
            >
                <EditTemplate
                    type={changingParameter.type}
                    value={changingParameter.rawNewValue}
                    onChange={onChangeNewValue}
                />
            </Form.Item>
        </Modal>
    );
}
