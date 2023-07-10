import SessionRepositoryInterface from "../../Domain/Deposit/SessionRepositoryInterface";
import Session from "../../Domain/Deposit/Session";
import transformer from "./Transformer";
import IndexedDB, {DEPOSIT_SESSION_STORE} from "../IndexedDB/IndexedDB";

export default class IndexedDBDepositSessionRepository
    implements SessionRepositoryInterface {
    private db: IndexedDB;

    constructor() {
        this.db = IndexedDB.getInstance();
    }

    async load(sessionId: string): Promise<Session | null> {
        if (this.db === null) {
            return null;
        }
        const store = this.db
            .transaction(DEPOSIT_SESSION_STORE)
            .objectStore(DEPOSIT_SESSION_STORE);

        const request = await store.get(sessionId);

        // eslint-disable-next-line no-prototype-builtins
        if (request.hasOwnProperty("id") && request.id === sessionId) {
            // for Firefox
            return transformer.reverseTransform(request);
        }

        //TODO::remove indexeddbshim?
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

    async all(): Promise<Session[]> {
        if (this.db === null) {
            return [];
        }

        const store = this.db
            .transaction(DEPOSIT_SESSION_STORE)
            .objectStore(DEPOSIT_SESSION_STORE);
        const request = await store.getAll();

        //TODO::remove indexeddbshim?
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

    async save(session: Session): Promise<boolean> {
        if (this.db === null) {
            return false;
        }

        const tx = this.db.transaction(DEPOSIT_SESSION_STORE, "readwrite");
        const store = tx.objectStore(DEPOSIT_SESSION_STORE);

        if (store.put === undefined) {
            return false;
        }

        await Promise.all([store.put(transformer.transform(session)), tx.done]);

        return true;
    }
}
