import React, {useEffect, useState} from "react";
import {Form, Modal, Input} from "bitshares-ui-style-guide";
import counterpart from "counterpart";

export default function EditModal({changingParameter, save, cancel}) {
    const [newValue, setNewValue] = useState("");
    useEffect(() => {
        setNewValue(changingParameter ? changingParameter.newValue : "");
    }, [changingParameter]);

    const isVisible = changingParameter !== null;
    if (!isVisible) {
        return null;
    }

    function onChangeNewValue(event) {
        setNewValue(event.currentTarget.value);
    }

    function onSave() {
        setNewValue("");
        save(newValue);
    }

    function onCancel() {
        setNewValue("");
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
                {changingParameter.value}
            </Form.Item>

            <Form.Item
                label={counterpart.translate(
                    "network_parameters.edit_modal.new_value"
                )}
                className="new-value"
                {...formItemLayout}
            >
                <Input defaultValue={newValue} onChange={onChangeNewValue} />
            </Form.Item>
        </Modal>
    );
}
