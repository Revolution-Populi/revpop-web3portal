import React from "react";
import HelpContent from "../../Utility/HelpContent";

export default function Index() {
    return (
        <div className="grid-block">
            <div className="grid-block vertical medium-horizontal">
                <div className="grid-block vertical">
                    <div className="grid-content deposit">
                        <HelpContent path={"components/Deposit"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
