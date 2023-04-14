import React, {useEffect, useState} from "react";
// @ts-ignore
import {Table} from "bitshares-ui-style-guide";
import {
    GetSessions,
    getSessionsHandler,
    Session as SessionDomain
} from "../../../../Context/EES";

type Props = {
    session: SessionDomain;
};

export default function Session({session}: Props) {
    const [sessions, setSessions] = useState<SessionDomain[]>([]);

    return <></>;
}
