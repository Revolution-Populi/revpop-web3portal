import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import {useParams} from "react-router-dom";
import useLoadSession from "../Hooks/useLoadSession";

type SelectorParams = {
    sessionId: string;
};

export default function Index() {
    const {sessionId} = useParams<SelectorParams>();
    const [session, error] = useLoadSession(sessionId);

    console.log(session, error);

    if (!session) {
        return <p>Can&apos;t load session</p>;
    }

    return (
        <div className="htlc-created asset-card">
            <div className="card-divider">
                <Translate content="deposit.html_created" />
            </div>
            <table className="table key-value-table">
                <tbody>
                    <tr>
                        <td>
                            <Translate content="deposit.form.tx_hash.label" />
                        </td>
                        <td>{session.txHash}</td>
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.form.amount.label" />
                        </td>
                        {/*<td>{htlc.amount}</td>*/}
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.form.hash_lock.label" />
                        </td>
                        {/*<td>{htlc.hashLock}</td>*/}
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.form.time_lock.label" />
                        </td>
                        {/*<td>{htlc.timeout?.format("lll")}</td>*/}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
