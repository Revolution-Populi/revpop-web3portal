import React, {useState} from "react";
import counterpart from "counterpart";
import {Form, Input, Modal} from "bitshares-ui-style-guide";
import networkParametersRepository from "../Repository/NetworkParameters";

export default function AddNewParameterModal({isVisible, close}) {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");

    async function save() {}

    function onChangeName(event) {
        setName(event.currentTarget.value);
    }

    function onChangeValue(event) {
        setValue(event.currentTarget.value);
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
                "network_parameters.add_new_parameter.title"
            )}
            className="add-new-parameter-modal"
            visible={isVisible}
            onOk={save}
            onCancel={close}
        >
            <Form.Item
                label={counterpart.translate(
                    "network_parameters.add_new_parameter.name"
                )}
                className="name"
                {...formItemLayout}
            >
                <Input defaultValue={name} onChange={onChangeName} />
            </Form.Item>

            <Form.Item
                label={counterpart.translate(
                    "network_parameters.add_new_parameter.value"
                )}
                className="value"
                {...formItemLayout}
            >
                <Input defaultValue={value} onChange={onChangeValue} />
            </Form.Item>
        </Modal>
    );
}
