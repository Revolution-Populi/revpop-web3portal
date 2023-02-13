import React, {useEffect, useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";
import {
    MakeDeposit,
    makeDepositHandler,
    Session
} from "../../../../Context/Deposit";

interface Params {
    session: Session;
    refresh: () => void;
}

export default function CreateNewExternalContractButton({
    session,
    refresh
}: Params) {
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

    async function onClick() {
        const query = new MakeDeposit("metamask", currentAddress, session.id);
        try {
            const result = await makeDepositHandler.execute(query);
            if (result) {
                refresh();
            }
        } catch (e) {
            console.log("Create new external contract error");
        }
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

    return (
        <a onClick={onClick} className="button">
            <Translate content="deposit.session.actions.create_new_external_contract" />
        </a>
    );
}
