import React, {createContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Metamask from "./Metamask/Index";
import Manually from "./Manually/Index";
import Page404 from "../../../Page404/Page404";
import {Session, StartSession, initializeSessionHandler} from "../../../../Context/Deposit";

type SelectorParams = {
    type: string;
};

export const SessionContext = createContext<Session | null>(null);

export default function Index() {
    const {type} = useParams<SelectorParams>();
    const [session, setSession] = useState<Session | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchSession() {
            const query = new StartSession();
            const sessionOrError = await initializeSessionHandler.execute(query);

            if (sessionOrError.isFailure()) {
                setError(true);
                return;
            }

            setSession(sessionOrError.value);
        }

        fetchSession();
    }, []);

    if (error) {
        return <p>Something went wrong</p>;
    }

    if (session === null) {
        return <p>Starting deposit session</p>;
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
