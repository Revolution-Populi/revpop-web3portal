import React, {useEffect, useState} from "react";
import DepositForm from "../../Form/Index";
// @ts-ignore
import Translate from "react-translate-component";

export default function Index() {
    const [installed, setInstalled] = useState(true);
    const [connected, setConnected] = useState(false);
    const [currentAddress, setCurrentAddress] = useState("");

    useEffect(() => {
        async function isConnected() {
            if (window.ethereum === undefined) {
                setInstalled(false);
                return;
            }

            const accounts = await window.ethereum.request<string[]>({
                method: "eth_accounts"
            });

            if (accounts === null || accounts === undefined || accounts.length === 0) {
                setConnected(false);
                return;
            }

            setConnected(true);
            setCurrentAddress(accounts[0] as string);
        }

        isConnected();
    }, []);

    async function connect() {
        const accounts = await window.ethereum.request<string[]>({
            method: "eth_requestAccounts"
        });

        if (accounts === null || accounts === undefined || accounts.length === 0) {
            setConnected(false);
            return;
        }

        setConnected(true);
        setCurrentAddress(accounts[0] as string);
    }

    if (!installed) {
        return <Translate content="deposit.metamask_not_installed" />;
    }

    if (!connected) {
        return (
            <>
                <Translate content="deposit.metamask_not_connected" component="p" />
                <a className="button primary" onClick={connect}>
                    <Translate content="deposit.connect" />
                </a>
            </>
        );
    }

    return <DepositForm from={currentAddress} />;
}
