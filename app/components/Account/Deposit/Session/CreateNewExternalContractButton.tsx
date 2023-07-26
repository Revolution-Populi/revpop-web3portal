import React, {useEffect, useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";
import {
    MakeDeposit,
    makeDepositHandler,
    Session
} from "../../../../Context/EES";
// @ts-ignore
import {Notification} from "bitshares-ui-style-guide";
import counterpart from "counterpart";

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
    const [isCreating, setIsCreating] = useState(false);
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
            Notification.info({
                message: counterpart.translate(
                    "deposit.session.warnings.waiting_for_contract_creation_in_external_blockchain"
                ),
                duration: 10
            });
            setIsCreating(true);
            const result = await makeDepositHandler.execute(query);
            if (result) {
                refresh();
            }
        } catch (e) {
            setIsCreating(false);
            Notification.warning({
                message: counterpart.translate(
                    "deposit.session.warnings.error_creating_external_contract"
                ),
                duration: 10
            });
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
        <button
            onClick={onClick}
            className="button ant-btn ant-btn-primary"
            disabled={isCreating}
        >
            {!isCreating && (
                <Translate content="deposit.session.actions.create_new_external_contract" />
            )}
            {isCreating && (
                <Translate content="deposit.session.actions.creating_new_external_contract" />
            )}
        </button>
    );
}
