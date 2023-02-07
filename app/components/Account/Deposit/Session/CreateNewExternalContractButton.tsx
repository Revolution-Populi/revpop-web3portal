import React, {useEffect, useState} from "react";
import counterpart from "counterpart";
// @ts-ignore
import Translate from "react-translate-component";
import {
    MakeDeposit,
    makeDepositHandler,
    Session
} from "../../../../Context/Deposit";

interface Params {
    session: Session;
}

export default function CreateNewExternalContractButton({session}: Params) {
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
        await makeDepositHandler.execute(query);
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
                <a className="button primary" onClick={connect}>
                    <Translate content="deposit.metamask.connect" />
                </a>
            </>
        );
    }

    return (
        <a onClick={onClick} className="button primary">
            <span>
                <Translate content="deposit.session.actions.create_new_external_contract" />
            </span>
        </a>
    );
}
