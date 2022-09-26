import React, {useEffect, useState} from "react";
import DepositForm from "../../Form/Index";
// @ts-ignore
import Translate from "react-translate-component";
import {Moment} from "moment";

export interface HTLC {
    txHash: string;
    amount: number | null;
    hashLock: string;
    timeout: Moment | null;
}

export default function Index() {
    const [installed, setInstalled] = useState(true);
    const [connected, setConnected] = useState(false);
    const [htlc, setHTLC] = useState<HTLC | null>(null);
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

    function onConfirmed(txHash: string, amount: number, hashLock: string, timeout: Moment) {
        setHTLC({txHash, amount, hashLock, timeout});
    }

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

    return <DepositForm from={currentAddress} onConfirmed={onConfirmed} />;
}
