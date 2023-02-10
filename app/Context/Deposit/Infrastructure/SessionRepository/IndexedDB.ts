import {DBSchema, IDBPDatabase, openDB} from "idb";
import SessionRepositoryInterface from "../../Domain/SessionRepositoryInterface";
import Session from "../../Domain/Session";
import transformer from "./Transformer";

interface DB extends DBSchema {
    session: {
        value: {
            id: string;
            value: string;
            hashLock: string;
            timeLock: number;
        };
        key: string;
    };
}

const DB_NAME = "web3portal";
const DB_VERSION = 1;
const SESSION_TABLE = "session";

//This repository has problems because of "indexeddbshim" package

export default class IndexedDB implements SessionRepositoryInterface {
    private db: IDBPDatabase<DB> | null = null;

    constructor() {
        this.openDatabase();
    }

    async load(sessionId: string): Promise<Session | null> {
        if (this.db === null) {
            return null;
        }

        const store = this.db
            .transaction(SESSION_TABLE)
            .objectStore(SESSION_TABLE);
        const request = await store.get(sessionId);

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
            .transaction(SESSION_TABLE)
            .objectStore(SESSION_TABLE);
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

        const tx = this.db.transaction(SESSION_TABLE, "readwrite");
        const store = tx.objectStore(SESSION_TABLE);
        await Promise.all([store.put(transformer.transform(session)), tx.done]);

        return true;
    }

    private async openDatabase() {
        this.db = await openDB<DB>(DB_NAME, DB_VERSION, {
            upgrade: db => {
                if (!db.objectStoreNames.contains(SESSION_TABLE)) {
                    db.createObjectStore(SESSION_TABLE, {keyPath: "id"});
                }
            }
        });
    }
}
