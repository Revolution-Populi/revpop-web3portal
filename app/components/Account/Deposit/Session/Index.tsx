import React from "react";
import Web3 from "web3";
import moment from "moment";
// @ts-ignore
import Translate from "react-translate-component";
import counterpart from "counterpart";
import {useParams} from "react-router-dom";
import useLoadSession from "../Hooks/useLoadSession";
import CheckRevpopButton from "./CheckRevpopButton";

type SelectorParams = {
    sessionId: string;
};

export default function Index() {
    const {sessionId} = useParams<SelectorParams>();
    const [session, error] = useLoadSession(sessionId);

    if (!session) {
        return <p>Can&apos;t load session</p>;
    }

    return (
        <div className="htlc-created asset-card">
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
                    {session.contract !== null && (
                        <>
                            <tr>
                                <td>
                                    <Translate content="deposit.session.fields.tx_hash.label" />
                                </td>
                                <td>{session.txHash}</td>
                            </tr>
                            <tr>
                                <td>
                                    <Translate content="deposit.form.amount.label" />
                                </td>
                                <td>
                                    {Web3.utils.fromWei(
                                        session.contract.amount
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Translate content="deposit.form.hash_lock.label" />
                                </td>
                                <td>{session.contract.hashLock}</td>
                            </tr>
                            <tr>
                                <td>
                                    <Translate content="deposit.form.time_lock.label" />
                                </td>
                                <td>
                                    {moment
                                        .unix(session.contract.timeLock)
                                        .format("LLL")}
                                </td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
            <div className="actions">
                {session.isPaid() && (
                    <CheckRevpopButton sessionId={session.id} />
                )}
            </div>
        </div>
    );
}
