import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import "./cookies.css";

export default function CookiesPopup() {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    const [accepted, setAccepted] = React.useState(cookiesAccepted === "true");

    const onAcceptClick = () => {
        localStorage.setItem("cookiesAccepted", "true");
        setAccepted(true);
    };

    if (accepted) {
        return null;
    }

    return (
        <div className="cookie-law-info-bar grid-block align-center">
            <Translate unsafe content="cookies.we_use_cookies"></Translate>
            <button className={"button hollow primary"}>
                <Translate
                    content="wallet.accept"
                    onClick={onAcceptClick}
                ></Translate>
            </button>
        </div>
    );
}
