import React, {useEffect, useState} from "react";
import DepositForm from "../../Form/Index";
// @ts-ignore
import Translate from "react-translate-component";
import {Moment} from "moment";
import Confirmed from "./Confirmed";

export interface HTLC {
    txHash: string;
    amount: number;
    hashLock: string;
    timeout: Moment;
}

export default function Index() {
    const [installed, setInstalled] = useState(true);
    const [connected, setConnected] = useState(false);
    // const [htlc, setHTLC] = useState<HTLC | null>({
    //     txHash: "0x2688395bbe1e77021d9afa3e447af4ed01f130d266225896c28176d7d470c9c9",
    //     amount: 0.01,
    //     hashLock: "0x8ce85caf71efc05aaab671c4d8c09c307d0c45a49749777f96d0bd334dafd97f",
    //     timeout: moment()
    // });
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

    function onConfirmed(
        txHash: string,
        amount: number,
        hashLock: string,
        timeout: Moment
    ) {
        setHTLC({txHash, amount, hashLock, timeout});
    }

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

    if (htlc !== null) {
        return <Confirmed htlc={htlc} />;
    }

    return <DepositForm from={currentAddress} onConfirmed={onConfirmed} />;
}
