import React from "react";
import {connect} from "alt-react";
import SettingsStore from "../../../stores/SettingsStore";
import Ps from "perfect-scrollbar";
import PropTypes from "prop-types";

class GdexAgreementModal extends React.Component {
    static propTypes = {
        locale: PropTypes.string
    };

    constructor(props) {
        super();
        this.state = {
            locale: props.settings.get("locale", "en")
        };
    }

    componentDidMount() {
        // console.log(this.refs);
        if (this.refs.agreement) {
            let item = this.refs.agreement;
            // console.log(item);
            Ps.initialize(item);
        }
    }

    componentDidUpdate() {
        // console.log(this.refs);
        if (this.refs.agreement) {
            let item = this.refs.agreement;
            // console.log(item);
            Ps.update(item);
        }
    }

    _getAgreement(locale) {
        switch (locale) {
            case "zh":
            case "cn":
                return (
                    <div
                        className="container"
                        ref="agreement"
                        style={{
                            height: "500px",
                            overflow: "auto",
                            position: "relative"
                        }}
                    ></div>
                );
                break;
            default:
                return (
                    <div
                        className="container"
                        ref="agreement"
                        style={{
                            height: "500px",
                            overflow: "auto",
                            position: "relative"
                        }}
                    ></div>
                );
        }
    }
    render() {
        let {locale} = this.props;
        let msg = this._getAgreement(locale);
        return msg;
    }
}

export default connect(GdexAgreementModal, {
    listenTo() {
        return [SettingsStore];
    },
    getProps() {
        return {
            settings: SettingsStore.getState().settings
        };
    }
});
