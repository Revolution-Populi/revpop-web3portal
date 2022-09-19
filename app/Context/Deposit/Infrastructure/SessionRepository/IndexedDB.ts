import {openDB} from "idb";
import SessionRepositoryInterface from "../../Domain/SessionRepositoryInterface";
import Session from "../../Domain/Session";
import {IDBPDatabase} from "idb";
import transformer from "./Transformer";

export default class IndexedDB implements SessionRepositoryInterface {
    private DB_NAME = "session";
    private DB_VERSION = 1;
    private DEPOSIT_STORE = "deposit";
    private DB_TABLES = [this.DEPOSIT_STORE];

    private db: IDBPDatabase | null = null;

    constructor() {
        this.openDb();
    }

    async load(sessionId: string): Promise<Session | null> {
        if (this.db === null) {
            return null;
        }

        const tx = this.db.transaction(this.DEPOSIT_STORE, "readwrite");
        const store = tx.objectStore(this.DEPOSIT_STORE);
        const session = await store.get(sessionId);

        if (!session) {
            return null;
        }

        return transformer.reverseTransform(session);
    }

    async save(session: Session): Promise<boolean> {
        if (this.db === null) {
            return false;
        }

        const tx = this.db.transaction(this.DEPOSIT_STORE, "readwrite");
        const store = tx.objectStore(this.DEPOSIT_STORE);

        await Promise.all([store.put(transformer.transform(session)), tx.done]);

        return true;
    }

    private async openDb() {
        this.db = await openDB(this.DB_NAME, this.DB_VERSION, {
            upgrade: (db: IDBPDatabase) => {
                for (const tableName of this.DB_TABLES) {
                    if (db.objectStoreNames.contains(tableName)) {
                        continue;
                    }
                    db.createObjectStore(tableName, {keyPath: "id"});
                }
            }
        });
    }
}
