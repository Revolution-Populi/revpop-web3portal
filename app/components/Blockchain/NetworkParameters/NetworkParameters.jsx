import React from "react";
import AltContainer from "alt-container";
import HelpContent from "../../Utility/HelpContent";
import {Apis} from "@revolutionpopuli/revpopjs-ws";
import ParametersList from "./ParametersList";
import counterpart from "counterpart";
import SearchInput from "../../Utility/SearchInput";

class NetworkParameters extends React.Component {
    render() {
        return (
            <div className="grid-block">
                <div className="grid-block vertical medium-horizontal">
                    <div className="grid-block vertical">
                        <div className="grid-content">
                            <HelpContent
                                path={"components/NetworkParameters"}
                            />
                            <ParametersList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NetworkParameters;
