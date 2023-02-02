import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
// @ts-ignore
import {Table} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import {
    GetSessions,
    getSessionsHandler,
    Session
} from "../../../../Context/Deposit";

const columns = [
    {
        title: counterpart.translate("deposit.session.fields.id.label"),
        dataIndex: "id",
        render: (id: string) => <Link to={`/deposit/${id}`}>{id}</Link>
    },
    {
        title: counterpart.translate("deposit.session.fields.tx_hash.label"),
        dataIndex: "tx_hash"
    },
    {
        title: counterpart.translate("deposit.session.fields.amount.label"),
        dataIndex: "amount"
    },
    {
        title: counterpart.translate("deposit.session.fields.time_lock.label"),
        dataIndex: "time_lock"
    },
    {
        title: counterpart.translate("deposit.session.fields.status.label"),
        dataIndex: "status"
    }
];

export default function Sessions() {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        async function loadSessions() {
            const query = new GetSessions();
            const sessionsOrError = await getSessionsHandler.execute(query);

            if (sessionsOrError.isFailure()) {
                return <p>{counterpart.translate("deposit.session.empty")}</p>;
            }

            setSessions(sessionsOrError.value);
        }

        loadSessions();
    }, []);

    if (sessions.length === 0) {
        return <p>{counterpart.translate("deposit.session.empty")}</p>;
    }

    const data = sessions.map(session => ({
        key: session.id,
        id: session.id
    }));

    return <Table columns={columns} dataSource={data} />;
}
