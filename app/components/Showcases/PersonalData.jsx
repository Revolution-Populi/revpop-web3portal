import React, {Component} from "react";
import Translate from "react-translate-component";
import AccountSelector from "../Account/AccountSelector";
import PersonalDataFull from "../Forms/PersonalDataFull";
import PersonalDataView from "./PersonalDataView";
import counterpart from "counterpart";
import AccountStore from "stores/AccountStore";
import {PersonalData as PersonalDataObject} from "@revolutionpopuli/revpopjs";
import ApplicationApi from "../../api/ApplicationApi";
import {map} from "lodash-es";
import {
    Card,
    Checkbox,
    Col,
    Form,
    Row,
    Button,
    Tooltip,
    Icon
} from "bitshares-ui-style-guide";
import StorageSelector from "./StorageSelector";
const CheckboxGroup = Checkbox.Group;

export default class PersonalData extends Component {
    constructor() {
        const pd = new PersonalDataObject();
        super();
        this.state = {
            from_name: "",
            to_name: "",
            share_name: "",
            from_account: null,
            to_account: null,
            share_account: null,
            share_options: [],
            share_exists: false,
            my_data: pd,
            my_data_parts: pd.getAllParts(),
            my_data_save: false,
            view_data: null,
            view_data_loaded: false,
            view_data_missing: false,
            from_error: null,
            to_error: null
        };

        this.share_options_available = [
            {
                label: counterpart.translate(
                    "showcases.personal_data.form.email"
                ),
                value: "email"
            },
            {
                label: counterpart.translate(
                    "showcases.personal_data.form.full_name"
                ),
                value: "name"
            },
            {
                label: counterpart.translate(
                    "showcases.personal_data.form.phone"
                ),
                value: "phone"
            },
            {
                label: counterpart.translate(
                    "showcases.personal_data.form.photo"
                ),
                value: "photo"
            }
        ];

        this.my_personal_data_ref = React.createRef();
    }

    componentWillMount() {
        let currentAccount = AccountStore.getState().currentAccount;
        if (!this.state.from_name) this.setState({from_name: currentAccount});
    }

    fromChanged(from_name) {
        this.setState({from_name});
    }

    onFromAccountChanged(from_account) {
        const {my_data_delete, view_data_loaded} = this.state;
        const load_my_data = my_data_delete;
        const load_view_data = view_data_loaded;
        this.setState({from_account});
        this.clearMyData();
        this.clearViewData();
        this.clearShareData();
        if (load_my_data) {
            this.loadMyData();
        }
        if (load_view_data) {
            this.loadViewData();
        }
    }

    toChanged(to_name) {
        this.setState({to_name});
    }

    onToAccountChanged(to_account) {
        this.setState({to_account});
        this.clearViewData();
    }

    handleMyDataChange() {
        let {from_account, my_data_parts} = this.state;
        const {data} = this.my_personal_data_ref.current.state;
        this.setState({
            my_data_save:
                from_account &&
                JSON.stringify(my_data_parts) !==
                    JSON.stringify(data.getAllParts())
        });
    }

    async loadMyData() {
        let {from_name} = this.state;
        let my_data = new PersonalDataObject();
        let my_data_parts = my_data.getAllParts();
        if (!from_name) {
            this.setState({my_data, my_data_parts});
            return;
        }

        const {data} = await ApplicationApi.loadPersonalData(
            from_name,
            from_name
        );
        if (!data) {
            this.setState({my_data, my_data_parts});
            this.my_personal_data_ref.current.setData(my_data);
            return;
        }

        my_data = data;
        my_data_parts = my_data.getAllParts();
        this.setState({
            my_data,
            my_data_parts,
            my_data_save: false,
            my_data_delete: true
        });
        this.my_personal_data_ref.current.setData(my_data);

        if (my_data.getPhoto()) {
            this.loadMyPhoto();
        }

        this.checkShareAvailable();
    }

    async saveMyData() {
        let {from_name, my_data} = this.state;

        if (!from_name) {
            return;
        }

        const {
            photo,
            new_photo_content,
            new_photo_meta
        } = this.my_personal_data_ref.current.state;
        if (new_photo_content) {
            await this.saveMyPhoto(new_photo_content, new_photo_meta);
            this.my_personal_data_ref.current.resetUploadStatus();
        } else if (!photo) {
            my_data.setPhoto();
        }

        return await ApplicationApi.updatePersonalData(
            from_name,
            from_name,
            my_data
        );
    }

    async deleteMyData() {
        let {from_name} = this.state;

        if (!from_name) {
            return;
        }

        await ApplicationApi.deletePersonalData(from_name, from_name);
    }

    clearMyData() {
        const my_data = new PersonalDataObject();
        this.setState({
            my_data,
            my_data_parts: my_data.getAllParts(),
            my_data_save: false,
            my_data_delete: false
        });
        if (this.my_personal_data_ref.current) {
            this.my_personal_data_ref.current.setData(my_data);
        }
    }

    async loadMyPhoto() {
        let {from_name, my_data} = this.state;
        const buffer = await ApplicationApi.loadContent(
            from_name,
            my_data.getPhoto()
        );
        this.my_personal_data_ref.current.readPhoto(buffer);
    }

    async saveMyPhoto(buffer, meta) {
        let {from_name, my_data} = this.state;
        const url = await ApplicationApi.saveContent(
            from_name,
            from_name,
            buffer
        );
        my_data.setPhoto(
            PersonalDataObject.makeReference(
                url,
                meta.type,
                my_data._computeSha256(buffer)
            )
        );
    }

    shareChanged(share_name) {
        this.setState({share_name});
    }

    onShareAccountChanged(share_account) {
        this.setState({share_account});
        this.clearShareData();
        this.checkShareAvailable();
    }

    async checkShareAvailable() {
        const {from_name, share_name, my_data_delete} = this.state;
        let share_exists =
            my_data_delete &&
            from_name &&
            share_name &&
            from_name != share_name;
        let share_options = [];
        if (share_exists) {
            const {blockchain, data} = await ApplicationApi.loadPersonalData(
                from_name,
                share_name
            );
            share_exists = typeof blockchain !== "undefined";
            if (share_exists) {
                share_options = this.share_options_available
                    .map(i => i.value)
                    .filter(i => data.isAvailable(i));
            }
        }
        this.setState({share_exists, share_options});
    }

    clearShareData() {
        this.setState({share_exists: false});
    }

    async shareData() {
        let {from_name, share_name, my_data, share_options} = this.state;
        let share_data = my_data.makePartial(share_options);

        return await ApplicationApi.updatePersonalData(
            from_name,
            share_name,
            share_data
        );
    }

    async shareDelete() {
        let {from_name, share_name} = this.state;
        await ApplicationApi.deletePersonalData(from_name, share_name);
        this.checkShareAvailable();
    }

    shareOptionsChanged(share_options) {
        this.setState({share_options});
    }

    async loadViewData() {
        let {
            from_name,
            to_name,
            view_data,
            view_data_loaded,
            view_data_missing
        } = this.state;

        const {data} = await ApplicationApi.loadPersonalData(
            to_name,
            from_name
        );
        if (!data) {
            view_data = null;
            view_data_loaded = false;
            view_data_missing = true;
            this.setState({view_data, view_data_loaded, view_data_missing});
            return;
        }

        view_data = data;
        view_data_loaded = true;
        view_data_missing = false;
        this.setState({
            view_data,
            view_data_loaded,
            view_data_missing
        });
    }

    clearViewData() {
        this.setState({
            view_data: null,
            view_data_loaded: false,
            view_data_missing: false
        });
    }

    render() {
        let {
            from_name,
            to_name,
            share_name,
            from_account,
            to_account,
            share_account,
            share_exists,
            share_options,
            my_data,
            my_data_save,
            my_data_delete,
            view_data,
            view_data_loaded,
            view_data_missing
        } = this.state;
        let smallScreen = window.innerWidth < 980 ? true : false;
        let same_user_share = from_account == share_account;
        let allow_to_share =
            my_data_delete && share_account && !same_user_share;
        let can_delete_share = share_exists;

        let my_personal_data = (
            <Card style={{borderRadius: "10px"}}>
                <Translate content={"showcases.personal_data.my.title"} />
                <div
                    style={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "flex-end"
                    }}
                >
                    <div style={{flexGrow: 1}}>
                        <AccountSelector
                            label="showcases.personal_data.my.account"
                            placeholder="placeholder"
                            style={{
                                marginTop: "0.5rem",
                                marginBottom: "1rem"
                            }}
                            allowPubKey={true}
                            allowUppercase={true}
                            account={from_account}
                            accountName={from_name}
                            onChange={this.fromChanged.bind(this)}
                            onAccountChanged={this.onFromAccountChanged.bind(
                                this
                            )}
                            hideImage
                            typeahead={true}
                        />
                    </div>
                    <div
                        className="ant-form-item"
                        style={{
                            paddingBottom: "8px",
                            paddingLeft: "20px",
                            alignSelf: "flex-end"
                        }}
                    >
                        <Button onClick={this.loadMyData.bind(this)}>
                            <Translate
                                content={"showcases.personal_data.my.load"}
                            />
                        </Button>
                    </div>
                </div>
                <div>
                    <PersonalDataFull
                        ref={this.my_personal_data_ref}
                        data={my_data}
                        onChange={this.handleMyDataChange.bind(this)}
                    />
                    <div>
                        <StorageSelector />
                    </div>
                    <div className="pd-buttons">
                        <Button
                            onClick={this.saveMyData.bind(this)}
                            disabled={!from_account || !my_data_save}
                        >
                            <Translate
                                content={"showcases.personal_data.my.save"}
                            />
                        </Button>
                        <Button
                            onClick={this.deleteMyData.bind(this)}
                            disabled={!from_account || !my_data_delete}
                        >
                            <Translate
                                content={"showcases.personal_data.my.delete"}
                            />
                        </Button>
                    </div>
                </div>
            </Card>
        );

        let view_personal_data = (
            <Card style={{borderRadius: "10px"}}>
                <Translate content={"showcases.personal_data.view.title"} />
                <div
                    style={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "flex-end"
                    }}
                >
                    <div style={{flexGrow: 1}}>
                        <AccountSelector
                            label="showcases.personal_data.view.account"
                            placeholder="placeholder"
                            style={{
                                marginTop: "0.5rem",
                                marginBottom: "1rem"
                            }}
                            allowPubKey={true}
                            allowUppercase={true}
                            account={to_account}
                            accountName={to_name}
                            onChange={this.toChanged.bind(this)}
                            onAccountChanged={this.onToAccountChanged.bind(
                                this
                            )}
                            hideImage
                            typeahead={true}
                        />
                    </div>
                    <div
                        className="ant-form-item"
                        style={{
                            paddingBottom: "8px",
                            paddingLeft: "20px",
                            alignSelf: "flex-end"
                        }}
                    >
                        <Button onClick={this.loadViewData.bind(this)}>
                            <Translate
                                content={"showcases.personal_data.view.load"}
                            />
                        </Button>
                    </div>
                </div>
                {view_data_missing && (
                    <Translate
                        content={"showcases.personal_data.view.no_data"}
                    />
                )}
                {!view_data_missing && !view_data_loaded && (
                    <Translate
                        content={"showcases.personal_data.view.load_data"}
                    />
                )}
                {view_data_loaded && (
                    <PersonalDataView
                        data={view_data}
                        operator={from_name}
                        subject={to_name}
                    />
                )}
            </Card>
        );

        let share_data = (
            <Card style={{borderRadius: "10px"}}>
                <Translate content={"showcases.personal_data.share.title"} />
                <AccountSelector
                    label="showcases.personal_data.share.account"
                    placeholder="placeholder"
                    style={{
                        marginTop: "0.5rem",
                        marginBottom: "1rem"
                    }}
                    allowPubKey={true}
                    allowUppercase={true}
                    account={share_account}
                    accountName={share_name}
                    onChange={this.shareChanged.bind(this)}
                    onAccountChanged={this.onShareAccountChanged.bind(this)}
                    hideImage
                    typeahead={true}
                />
                <div>
                    {!allow_to_share && (
                        <div>
                            {same_user_share ? (
                                <Translate
                                    content={
                                        "showcases.personal_data.share.same_user"
                                    }
                                />
                            ) : (
                                <Translate
                                    content={
                                        "showcases.personal_data.share.load_data"
                                    }
                                />
                            )}
                        </div>
                    )}
                    {allow_to_share && [
                        <Form.Item
                            label={counterpart.translate(
                                "showcases.personal_data.share.select_parts"
                            )}
                            key="select_parts-field"
                        >
                            <div style={{textAlign: "center"}}>
                                <CheckboxGroup
                                    options={this.share_options_available}
                                    value={share_options}
                                    onChange={this.shareOptionsChanged.bind(
                                        this
                                    )}
                                />
                            </div>
                        </Form.Item>,
                        <div className="pd-buttons">
                            <Button
                                onClick={this.shareData.bind(this)}
                                disabled={
                                    !allow_to_share || !share_options.length
                                }
                            >
                                <Translate
                                    content={
                                        "showcases.personal_data.share.save"
                                    }
                                />
                            </Button>
                            <Button
                                onClick={this.shareDelete.bind(this)}
                                disabled={!can_delete_share}
                            >
                                <Translate
                                    content={
                                        "showcases.personal_data.share.delete"
                                    }
                                />
                            </Button>
                        </div>
                    ]}
                </div>
            </Card>
        );

        let intro = (
            <Card
                style={{
                    borderRadius: "10px"
                }}
            >
                <Tooltip
                    title={counterpart.translate(
                        "showcases.personal_data.description"
                    )}
                    placement="bottom"
                >
                    <h2 style={{textAlign: "center"}}>
                        <Translate content={"showcases.personal_data.title"} />{" "}
                        <Icon type="question-circle" theme="filled" />
                    </h2>
                </Tooltip>
            </Card>
        );

        return (
            <div
                className="center"
                style={{
                    padding: "10px",
                    maxWidth: "80rem",
                    width: "100%",
                    margin: "0 auto"
                }}
            >
                <Card>
                    {smallScreen ? (
                        <div>
                            <Row className="pd-title">
                                <Col style={{padding: "10px"}}>{intro}</Col>
                            </Row>
                            <Row>
                                <Col style={{padding: "10px"}}>
                                    {my_personal_data}
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{padding: "10px"}}>
                                    {view_personal_data}
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{padding: "10px"}}>
                                    {share_data}
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div>
                            <Row className="pd-title">
                                <Col style={{padding: "10px"}}>{intro}</Col>
                            </Row>
                            <Row>
                                <Col span={12} style={{padding: "10px"}}>
                                    {my_personal_data}
                                </Col>
                                <Col span={12} style={{padding: "10px"}}>
                                    {view_personal_data}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={{padding: "10px"}}>
                                    {share_data}
                                </Col>
                            </Row>
                        </div>
                    )}
                </Card>
            </div>
        );
    }
}
