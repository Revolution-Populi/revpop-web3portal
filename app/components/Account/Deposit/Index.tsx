import React from "react";
import HelpContent from "../../Utility/HelpContent";
import Metamask from "./Metamask/Index";

export default function Index() {
    return (
        <div className="deposit-page">
            <div className="grid-content">
                <HelpContent path={"components/Deposit"} />
            </div>

            <div className="grid-block align-center">
                <div className="deposit-form">
                    <Metamask />
                </div>
            </div>
        </div>
    );
}
