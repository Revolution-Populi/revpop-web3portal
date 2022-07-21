import React, {useEffect, useState} from "react";
import DepositForm from "../DepositForm";
// @ts-ignore
import Translate from "react-translate-component";
import Web3 from "web3";
import {provider} from "web3-core";
import contractAbi from "../../../../assets/abi/HashedTimelock.json";

export default function Index() {
    const [installed, setInstalled] = useState(true);
    const [connected, setConnected] = useState(true);
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
        return <Translate content="deposit.metamask_not_installed" />;
    }

    if (!connected) {
        return (
            <>
                <Translate
                    content="deposit.metamask_not_connected"
                    component="p"
                />
                <a className="button primary" onClick={connect}>
                    <Translate content="deposit.connect" />
                </a>
            </>
        );
    }

    return <DepositForm from={currentAddress} />;
}
