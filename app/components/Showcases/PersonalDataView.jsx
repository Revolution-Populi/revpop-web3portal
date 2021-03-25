import React from "react";
import Translate from "react-translate-component";
import {Component} from "react";
import counterpart from "counterpart";
import {Form, Icon as AntIcon} from "bitshares-ui-style-guide";
import {PersonalData} from "@revolutionpopuli/revpopjs";
import ApplicationApi from "../../api/ApplicationApi";

class PersonalDataView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || new PersonalData(),
            subject_name: props.subject || null,
            operator_name: props.operator || null,
            photo: null,
            photo_loaded: false,
            photo_loading: false,
            valid: null
        };

        if (props.subject && props.operator) {
            ApplicationApi.searchBlockchainPersonalData(
                props.subject,
                props.subject,
                this.state.data.getRootHash()
            ).then(result => this.setState({valid: result !== null}));
        }
    }

    setData(data) {
        this.setState({
            data,
            photo: null,
            photo_loaded: false,
            photo_loading: false
        });
    }

    async loadPhoto() {
        const {data, operator_name, photo_loaded, photo_loading} = this.state;
        if (
            photo_loaded ||
            photo_loading ||
            !data.getPhoto() ||
            !operator_name
        ) {
            return;
        }
        this.setState({photo: null, photo_loading: true});
        const buffer = await ApplicationApi.loadContent(
            operator_name,
            data.getPhoto()
        );
        if (buffer) {
            this.readPhoto(buffer);
        } else {
            this.setState({photo_loading: false, photo_loaded: true});
        }
    }

    readPhoto(buffer) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.setState({
                photo: reader.result,
                photo_loading: false,
                photo_loaded: true
            });
        });
        reader.addEventListener("error", () =>
            this.setState({photo_loading: false, photo_loaded: true})
        );
        reader.readAsDataURL(
            buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer)
                ? new Blob([buffer])
                : buffer
        );
    }

    render() {
        const {data, photo, photo_loaded, photo_loading, valid} = this.state;

        this.loadPhoto();

        const not_available = (
            <i>
                {counterpart.translate(
                    "showcases.personal_data.view.missing_part"
                )}
            </i>
        );

        const photo_view = [
            !data.isAvailable("photo") && not_available,
            data.isAvailable("photo") && photo_loading && (
                <i>
                    {counterpart.translate(
                        "showcases.personal_data.view.loading"
                    )}
                </i>
            ),
            data.isAvailable("photo") && photo_loaded && !photo && (
                <i>
                    {counterpart.translate(
                        "showcases.personal_data.view.load_error"
                    )}
                </i>
            ),
            data.isAvailable("photo") && photo_loaded && photo && (
                <img src={photo} alt="" className="avatar" />
            )
        ];

        return (
            <div className="pd-form">
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.first_name"
                    )}
                    key="first-name-field"
                >
                    {data.isAvailable("name")
                        ? data.getFirstName()
                        : not_available}
                </Form.Item>
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.last_name"
                    )}
                    key="last-name-field"
                >
                    {data.isAvailable("name")
                        ? data.getLastName()
                        : not_available}
                </Form.Item>
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.email"
                    )}
                    key="email-field"
                >
                    {data.isAvailable("email")
                        ? data.getEmail()
                        : not_available}
                </Form.Item>
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.phone"
                    )}
                    key="phone-field"
                >
                    {data.isAvailable("phone")
                        ? data.getPhone()
                        : not_available}
                </Form.Item>
                <Form.Item
                    label={counterpart.translate(
                        "showcases.personal_data.form.photo"
                    )}
                    key="photo-field"
                >
                    {photo_view}
                </Form.Item>
                <Form.Item style={{verticalAligh: "baseline"}}>
                    {valid !== null &&
                        (valid
                            ? [
                                  <AntIcon
                                      type="check-circle"
                                      style={{
                                          fontSize: "24px",
                                          color: "#7ed321",
                                          verticalAligh: "middle"
                                      }}
                                  />,
                                  <Translate
                                      content={
                                          "showcases.personal_data.view.valid"
                                      }
                                      style={{
                                          lineHeight: "24px",
                                          paddingLeft: "10px"
                                      }}
                                  />
                              ]
                            : [
                                  <AntIcon
                                      type="close-circle"
                                      style={{
                                          fontSize: "24px",
                                          color: "#999",
                                          verticalAligh: "middle"
                                      }}
                                  />,
                                  <Translate
                                      content={
                                          "showcases.personal_data.view.invalid"
                                      }
                                      style={{
                                          lineHeight: "24px",
                                          paddingLeft: "10px"
                                      }}
                                  />
                              ])}
                </Form.Item>
            </div>
        );
    }
}

export default PersonalDataView;
