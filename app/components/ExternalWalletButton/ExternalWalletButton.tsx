import React, {useEffect, useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";

type Params = {
    content: (currentAddress: string) => JSX.Element;
};

function ExternalWalletButton({content}: Params) {
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

            if (
                accounts === null ||
                accounts === undefined ||
                accounts.length === 0
            ) {
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

        if (
            accounts === null ||
            accounts === undefined ||
            accounts.length === 0
        ) {
            setConnected(false);
            return;
        }

        setConnected(true);
        setCurrentAddress(accounts[0] as string);
    }

    if (!installed) {
        return <Translate content="deposit.metamask.not_installed" />;
    }

    if (!connected) {
        return (
            <>
                <Translate
                    content="deposit.metamask.not_connected"
                    component="p"
                />
                <a className="button" onClick={connect}>
                    <Translate content="deposit.metamask.connect" />
                </a>
            </>
        );
    }

    return content(currentAddress);
}

export default ExternalWalletButton;
