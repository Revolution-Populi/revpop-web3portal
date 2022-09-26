import {DBSchema, IDBPDatabase, openDB} from "idb";
import SessionRepositoryInterface from "../../Domain/SessionRepositoryInterface";
import Session from "../../Domain/Session";
import transformer from "./Transformer";

interface DB extends DBSchema {
    session: {
        value: {
            id: string;
            smartContractAddress: string;
            receiverAddress: string;
            minimumAmount: string;
            minimumTimeLock: number;
            status: number;
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

        // const session = await this.db.get(SESSION_TABLE, sessionId)

        const store = this.db.transaction(SESSION_TABLE).objectStore(SESSION_TABLE);
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
