import {useEffect, useState} from "react";
import {GetSession, getSessionHandler, Session} from "../../../../Context/EES";

export default function useLoadSession(
    sessionId: string
): [Session | null, boolean, () => void] {
    const [session, setSession] = useState<Session | null>(null);
    const [error, setError] = useState<boolean>(false);

    async function loadSession() {
        const query = new GetSession(sessionId);
        const sessionOrError = await getSessionHandler.execute(query);

        if (sessionOrError.isFailure()) {
            setError(true);
            return;
        }

        const session = sessionOrError.value;

        setSession(session);
    }

    useEffect(() => {
        loadSession();
    }, [sessionId]);

    return [session, error, loadSession];
}
