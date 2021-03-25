import React from "react";
import {Component} from "react";
import counterpart from "counterpart";
import {Form, Icon as AntIcon, Input, Upload} from "bitshares-ui-style-guide";
import {PersonalData} from "@revolutionpopuli/revpopjs";

class PersonalDataFull extends Component {
    constructor(props) {
        super(props);

        this.photo = React.createRef();
        this.state = {
            data: props.data || new PersonalData(),
            photo: null,
            new_photo_content: null,
            new_photo_meta: null
        };

        this.changeTrigger = props.onChange;
        this.handleChange = this.handleChange.bind(this);
        this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
        this.validatePhoto = this.validatePhoto.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
    }

    setData(data) {
        this.setState({
            data,
            photo: null,
            new_photo_content: null,
            new_photo_meta: null
        });
    }

    resetUploadStatus() {
        this.setState({
            new_photo_content: null,
            new_photo_meta: null
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const setter = "set" + name.charAt(0).toUpperCase() + name.slice(1);
        let {data} = this.state;
        data[setter](value);
        data = Object.assign(Object.create(Object.getPrototypeOf(data)), data);
        this.setState({data});

        if (this.changeTrigger) {
            this.changeTrigger.call(this);
        }
    }

    readPhoto(buffer) {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
            this.setState({
                photo: reader.result
            })
        );
        reader.readAsDataURL(
            buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer)
                ? new Blob([buffer])
                : buffer
        );
    }

    handlePhotoUpload(event) {
        if (event.file.status === "done") {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.setState({
                    new_photo_content: reader.result,
                    new_photo_meta: event.file
                });
                this.readPhoto(reader.result);
                let {data} = this.state;
                data.setPhoto(
                    PersonalData.makeReference(
                        null,
                        event.file.type,
                        data._computeSha256(reader.result)
                    )
                );

                if (this.changeTrigger) {
                    this.changeTrigger.call(this);
                }
            });
            reader.readAsArrayBuffer(event.file.originFileObj);
        }
    }

    validatePhoto(file) {
        const isImage = file.type === "image/jpeg" || file.type === "image/png";
        const isValidSize = file.size <= 1024 * 1024 * 5;
        return isImage && isValidSize;
    }

    deletePhoto(event) {
        event.stopPropagation();
        let {data} = this.state;
        data.setPhoto(null);
        this.setState({
            photo: null,
            new_photo_content: null,
            new_photo_meta: null
        });
        if (this.changeTrigger) {
            this.changeTrigger.call(this);
        }
    }

    render() {
        const {data, photo} = this.state;

        const getNameValidateStatus = () => {
            return "";
            // return "error";
        };

        const uploadButton = photo ? (
            [
                <img src={photo} alt="" className="avatar" />,
                <AntIcon
                    type="delete"
                    className="avatar-delete-trigger"
                    onClick={this.deletePhoto}
                />
            ]
        ) : (
            <AntIcon type="plus" className="avatar-uploader-trigger" />
        );

        return (
            <div className="pd-form">
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.first_name"
                    )}
                    key="first-name-field"
                    validateStatus={getNameValidateStatus()}
                >
                    <Input
                        id="first-name"
                        type={"text"}
                        name="firstName"
                        placeholder={counterpart.translate(
                            "showcases.personal_data.form.first_name"
                        )}
                        maxLength={50}
                        onChange={this.handleChange}
                        value={data.getFirstName()}
                    />
                </Form.Item>
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.last_name"
                    )}
                    key="last-name-field"
                    validateStatus={getNameValidateStatus()}
                >
                    <Input
                        id="last-name"
                        type="text"
                        name="lastName"
                        placeholder={counterpart.translate(
                            "showcases.personal_data.form.last_name"
                        )}
                        maxLength={50}
                        onChange={this.handleChange}
                        value={data.getLastName()}
                    />
                </Form.Item>
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.email"
                    )}
                    key="email-field"
                    validateStatus={getNameValidateStatus()}
                >
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder={counterpart.translate(
                            "showcases.personal_data.form.email"
                        )}
                        maxLength={50}
                        onChange={this.handleChange}
                        value={data.getEmail()}
                    />
                </Form.Item>
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.phone"
                    )}
                    key="phone-field"
                    validateStatus={getNameValidateStatus()}
                >
                    <Input
                        id="phone"
                        type="text"
                        name="phone"
                        placeholder={counterpart.translate(
                            "showcases.personal_data.form.phone"
                        )}
                        maxLength={20}
                        onChange={this.handleChange}
                        value={data.getPhone()}
                    />
                </Form.Item>
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.photo"
                    )}
                    key="photo-field"
                    validateStatus={"error"}
                >
                    <Upload
                        name="photo"
                        className="avatar-uploader"
                        ref={this.photo}
                        showUploadList={false}
                        beforeUpload={this.validatePhoto}
                        onChange={this.handlePhotoUpload}
                        onRemove={this.handlePhotoUpload}
                    >
                        {uploadButton}
                    </Upload>
                </Form.Item>
            </div>
        );
    }
}

export default PersonalDataFull;
