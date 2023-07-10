import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
// @ts-ignore
import {Table} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import {
    GetSessions,
    getSessionsHandler,
    Session
} from "../../../../Context/EES";
import Web3 from "web3";

const columns = [
    {
        title: counterpart.translate("deposit.session.fields.id.label"),
        dataIndex: "id",
        render: (id: string) => <Link to={`/deposit/${id}`}>{id}</Link>
    },
    {
        title: counterpart.translate("deposit.session.fields.value.label"),
        dataIndex: "value",
        render: (value: string) => `${Web3.utils.fromWei(value)} ETH`
    },
    {
        title: counterpart.translate("deposit.session.fields.status.label"),
        dataIndex: "status",
        render: (status: number) =>
            counterpart(`deposit.session.fields.status.list.${status}`)
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

    return <Table columns={columns} dataSource={sessions} />;
}
