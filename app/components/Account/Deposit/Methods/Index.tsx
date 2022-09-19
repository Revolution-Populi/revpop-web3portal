import React, {createContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Metamask from "./Metamask/Index";
import Manually from "./Manually/Index";
import Page404 from "../../../Page404/Page404";
import {StartSession, startSessionHandler} from "../../../../Context/Deposit";

type SelectorParams = {
    type: string;
};

export interface Session {
    id: string;
}

export const SessionContext = createContext<Session | null>(null);

export default function Index() {
    const {type} = useParams<SelectorParams>();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        async function fetchSession() {
            const query = new StartSession();
            const session = await startSessionHandler.execute(query);
            setSession({
                id: session.id
            });
        }

        fetchSession();
    }, []);

    if (session === null) {
        return null;
    }

    switch (type) {
        case "metamask":
            return (
                <SessionContext.Provider value={session}>
                    <div className="deposit-form">
                        <Metamask />
                    </div>
                </SessionContext.Provider>
            );
        case "manually":
            return <Manually />;
        default:
            return <Page404 />;
    }
}
