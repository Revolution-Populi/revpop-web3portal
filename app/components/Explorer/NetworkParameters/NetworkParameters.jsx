import React from "react";
import HelpContent from "../../Utility/HelpContent";
import ParametersList from "./ParametersList";

export default function NetworkParameters() {
    return (
        <div className="grid-block">
            <div className="grid-block vertical medium-horizontal">
                <div className="grid-block vertical">
                    <div className="grid-content network-parameters">
                        <HelpContent path={"components/NetworkParameters"} />
                        <div className="network-parameters-list">
                            <ParametersList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
