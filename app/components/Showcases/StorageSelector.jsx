import React, {Component} from "react";

import {Select, Form} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";

export default class StorageSelector extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Form>
                <Translate content={"showcases.personal_data.form.storage"} />
                <Form.Item>
                    <Select defaultValue="ipfs">
                        <Select.Option value="ipfs">IPFS</Select.Option>
                        <Select.Option value="google-drive">
                            Google drive
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        );
    }
}
