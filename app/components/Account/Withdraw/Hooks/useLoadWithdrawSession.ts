import {useEffect, useState} from "react";
import {
    GetWithdrawSession,
    getWithdrawSessionHandler,
    WithdrawSession
} from "../../../../Context/EES";

export default function useLoadWithdrawSession(
    sessionId: string
): [WithdrawSession | null, boolean, () => void] {
    const [session, setSession] = useState<WithdrawSession | null>(null);
    const [error, setError] = useState<boolean>(false);

    async function loadSession() {
        const query = new GetWithdrawSession(sessionId);
        const sessionOrError = await getWithdrawSessionHandler.execute(query);

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
