import React from "react";
import HelpContent from "../../Utility/HelpContent";
import ParametersList from "./ParametersList";

class NetworkParameters extends React.Component {
    render() {
        return (
            <div className="grid-block">
                <div className="grid-block vertical medium-horizontal">
                    <div className="grid-block vertical">
                        <div className="grid-content network-parameters">
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
