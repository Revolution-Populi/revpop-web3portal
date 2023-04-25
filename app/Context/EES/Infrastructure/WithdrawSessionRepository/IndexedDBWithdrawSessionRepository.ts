import WithdrawSessionRepositoryInterface from "../../Domain/Withdraw/WithdrawSessionRepositoryInterface";
import WithdrawSession from "../../Domain/Withdraw/WithdrawSession";
import transformer from "./Transformer";
import IndexedDB, {WITHDRAW_SESSION_STORE} from "../IndexedDB/IndexedDB";

export default class IndexedDBWithdrawSessionRepository
    implements WithdrawSessionRepositoryInterface {
    private db: IndexedDB;

    constructor() {
        this.db = new IndexedDB();
    }

    async load(sessionId: string): Promise<WithdrawSession | null> {
        const store = await this.db
            .transaction(WITHDRAW_SESSION_STORE)
            .objectStore(WITHDRAW_SESSION_STORE);
        const request = await store.get(sessionId);

        return new Promise((resolve, reject) => {
            // @ts-ignore
            request.onsuccess = () => {
                // @ts-ignore
                const session = request.result;

                if (!session) {
                    resolve(null);
                }

                // @ts-ignore
                resolve(transformer.reverseTransform(session));
            };

            // @ts-ignore
            request.onerror = () => {
                console.log("Load session error.");
            };
        });
    }

    async all(): Promise<WithdrawSession[]> {
        const store = this.db
            .transaction(WITHDRAW_SESSION_STORE)
            .objectStore(WITHDRAW_SESSION_STORE);
        const request = await store.getAll();

        return new Promise((resolve, reject) => {
            // @ts-ignore
            request.onsuccess = () => {
                const sessions = [];

                // @ts-ignore
                for (const session of request.result) {
                    sessions.push(transformer.reverseTransform(session));
                }

                console.log(sessions);

                // @ts-ignore
                resolve(sessions);
            };

            // @ts-ignore
            request.onerror = () => {
                console.log("Load sessions error.");
            };
        });
    }

    async save(session: WithdrawSession): Promise<boolean> {
        const tx = this.db.transaction(WITHDRAW_SESSION_STORE, "readwrite");
        const store = tx.objectStore(WITHDRAW_SESSION_STORE);

        if (store.put === undefined) {
            return false;
        }

        await Promise.all([store.put(transformer.transform(session)), tx.done]);

        return true;
    }
}
