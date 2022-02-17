import React, {Component} from "react";

import {Select, Form} from "bitshares-ui-style-guide";
import Translate from "react-translate-component";

import StorageRepository from "../../services/Repository/Storage/Repository";
import PropTypes from "prop-types";

export default class StorageSelector extends Component {
    static propTypes = {
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        const storages = StorageRepository.findAll();

        this.state = {
            storages: storages,
            defaultStorage: storages[0]
        };
    }

    componentDidMount() {
        this.onSelect(this.state.defaultStorage.id);
    }

    onSelect(storageId) {
        const storage = StorageRepository.find(storageId);
        this.props.onChange(storage);
    }

    render() {
        return (
            <Form>
                <Translate content={"showcases.personal_data.form.storage"} />
                <Form.Item>
                    <Select
                        onSelect={this.onSelect.bind(this)}
                        defaultValue={this.state.defaultStorage.id}
                    >
                        {this.state.storages.map(storage => (
                            <Select.Option key={storage.id} value={storage.id}>
                                {storage.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        );
    }
}
