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

    return (
        <Modal
            title={changingParameter ? changingParameter.name : ""}
            visible={isVisible}
            onOk={onSave}
            onCancel={onCancel}
        >
            <div>Value: {changingParameter.value}</div>
            <Form.Item
                label={counterpart.translate(
                    "network_parameters.edit_modal.new_value"
                )}
            >
                <Input defaultValue={newValue} onChange={onChangeNewValue} />
            </Form.Item>
        </Modal>
    );
}
