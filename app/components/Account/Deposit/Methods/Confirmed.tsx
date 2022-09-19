import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import {useParams} from "react-router-dom";

type SelectorParams = {
    sessionId: string;
};

export default function Confirmed() {
    const {sessionId} = useParams<SelectorParams>();

    console.log(sessionId);

    return (
        <div className="htlc-created asset-card">
            <div className="card-divider">
                <Translate content="deposit.html_created" />
            </div>
            <table className="table key-value-table">
                <tbody>
                    <tr>
                        <td>
                            <Translate content="deposit.tx_hash" />
                        </td>
                        {/*<td>{htlc.txHash}</td>*/}
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.amount" />
                        </td>
                        {/*<td>{htlc.amount}</td>*/}
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.hash_lock" />
                        </td>
                        {/*<td>{htlc.hashLock}</td>*/}
                    </tr>
                    <tr>
                        <td>
                            <Translate content="deposit.timeout" />
                        </td>
                        {/*<td>{htlc.timeout?.format("lll")}</td>*/}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
