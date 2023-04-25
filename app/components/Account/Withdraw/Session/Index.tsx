import React from "react";
import Web3 from "web3";
// @ts-ignore
import Translate from "react-translate-component";
import counterpart from "counterpart";
import {useParams} from "react-router-dom";
import useLoadWithdrawSession from "../Hooks/useLoadWithdrawSession";
import InternalIdField from "./InternalIdField";
import ExternalExplorerField from "./ExternalExplorerField";
import CreateNewWithdrawButton from "./CreateNewWithdrawButton";
import CheckWithdrawContractCreatedButton from "./CheckWithdrawContractCreatedButton";
import Redeem from "./Redeem";

type SelectorParams = {
    sessionId: string;
};

export default function Index() {
    const {sessionId} = useParams<SelectorParams>();
    const [session, error, refreshSession] = useLoadWithdrawSession(sessionId);

    if (!session) {
        return <p>Can&apos;t load session</p>;
    }

    return (
        <div className="session asset-card">
            <div className="card-divider">
                <Translate content="withdraw.session.title" />
            </div>
            <table className="table key-value-table">
                <tbody>
                    <tr>
                        <td>
                            <Translate content="withdraw.session.fields.status.label" />
                        </td>
                        <td>
                            {counterpart(
                                `withdraw.session.fields.status.list.${session.status}`
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Translate content="withdraw.session.fields.internal_account.label" />
                        </td>
                        <td>{session.internalAccountName}</td>
                    </tr>
                    <tr>
                        <td>
                            <Translate content="withdraw.session.fields.value.label" />
                        </td>
                        <td>{session.value} ETH</td>
                    </tr>
                    <tr>
                        <td>
                            <Translate content="withdraw.session.fields.hash_lock.label" />
                        </td>
                        <td>{session.hashLock}</td>
                    </tr>
                    <tr>
                        <td>
                            <Translate content="withdraw.session.fields.ethereum_address.label" />
                        </td>
                        <td>{session.ethereumAddress}</td>
                    </tr>
                    <InternalIdField session={session} />
                    <ExternalExplorerField session={session} />
                </tbody>
            </table>
            <div className="actions">
                {session.isCreated() && (
                    <>
                        <CreateNewWithdrawButton
                            session={session}
                            refresh={refreshSession}
                        />
                    </>
                )}
                {session.isPaid() && (
                    <CheckWithdrawContractCreatedButton
                        sessionId={session.id}
                        refresh={refreshSession}
                    />
                )}
                {session.isCreatedInternalBlockchain() && (
                    <Redeem session={session} refresh={refreshSession} />
                )}
            </div>
        </div>
    );
}
