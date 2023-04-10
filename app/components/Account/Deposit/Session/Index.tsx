import React from "react";
import Web3 from "web3";
// @ts-ignore
import Translate from "react-translate-component";
import counterpart from "counterpart";
import {useParams} from "react-router-dom";
import useLoadSession from "../Hooks/useLoadSession";
import InternalIdField from "./InternalIdField";
import ExternalExplorerField from "./ExternalExplorerField";
import CreateNewExternalContractButton from "./CreateNewExternalContractButton";
import CheckDepositContractCreatedButton from "./CheckDepositContractCreatedButton";
import Redeem from "./Redeem";
import Instructions from "./Manually/Instructions";
import AddTransaction from "./Manually/AddTransaction";

type SelectorParams = {
    sessionId: string;
};

export default function Index() {
    const {sessionId} = useParams<SelectorParams>();
    const [session, error, refreshSession] = useLoadSession(sessionId);

    if (!session) {
        return <p>Can&apos;t load session</p>;
    }

    return (
        <div className="session asset-card">
            <div className="card-divider">
                <Translate content="deposit.session.title" />
            </div>
            <table className="table key-value-table">
                <tbody>
                    <tr>
                        <td>
                            <Translate content="deposit.session.fields.status.label" />
                        </td>
                        <td>
                            {counterpart(
                                `deposit.session.fields.status.list.${session.status}`
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.session.fields.internal_account.label" />
                        </td>
                        <td>{session.internalAccount}</td>
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.session.fields.value.label" />
                        </td>
                        <td>{Web3.utils.fromWei(session.value)} ETH</td>
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.session.fields.hash_lock.label" />
                        </td>
                        <td>{session.hashLock}</td>
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.session.fields.time_lock.label" />
                        </td>
                        <td>{session.timeLock.format()}</td>
                    </tr>
                    <InternalIdField session={session} />
                    <ExternalExplorerField session={session} />
                </tbody>
            </table>
            <div className="actions">
                {session.isCreated() && (
                    <>
                        <CreateNewExternalContractButton
                            session={session}
                            refresh={refreshSession}
                        />
                        <Instructions session={session} />
                        <AddTransaction
                            session={session}
                            refresh={refreshSession}
                        />
                    </>
                )}
                {session.isPaid() && (
                    <CheckDepositContractCreatedButton
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
