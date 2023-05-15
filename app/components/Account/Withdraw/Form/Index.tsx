import React from "react";
import WithdrawForm from "./Form";
import useLoadEESSettings from "../../EES/Hooks/useLoadEESSettings";

//TODO::check existing payment
export default function Index() {
    const [settings, error] = useLoadEESSettings();

    if (error) {
        return (
            <div>Error loading settDepositings, please try again later.</div>
        );
    }

    if (null === settings) {
        return <div>Loading...</div>;
    }

    return <WithdrawForm settings={settings} />;
}
