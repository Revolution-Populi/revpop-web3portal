import React from "react";
import useLoadDepositSettings from "../Hooks/useLoadDepositSettings";
import DepositForm from "./Form";

//TODO::check existing payment
export default function Index() {
    const [settings, error] = useLoadDepositSettings();

    if (error) {
        return <div>Error loading settings, please try again later.</div>;
    }

    if (null === settings) {
        return <div>Loading...</div>;
    }

    return <DepositForm settings={settings} />;
}
