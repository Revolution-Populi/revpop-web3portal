import React from "react";
import useLoadEESSettings from "../../EES/Hooks/useLoadEESSettings";
import TokenDistributionForm from "./Form";

export default function Index() {
    const [settings, error] = useLoadEESSettings();

    if (error) {
        return <div>Error loading settings, please try again later.</div>;
    }

    if (null === settings) {
        return <div>Loading...</div>;
    }

    return <TokenDistributionForm settings={settings} />;
}
