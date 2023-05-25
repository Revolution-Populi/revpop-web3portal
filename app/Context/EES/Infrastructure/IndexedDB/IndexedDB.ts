import {DBSchema, IDBPDatabase, IDBPTransaction, openDB} from "idb";
interface DB1 extends DBSchema {
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
interface DB2 extends DBSchema {
    session: {
        value: {
            id: string;
            value: string;
            hashLock: string;
            timeLock: number;
        };
        key: string;
    };
    withdraw_session: {
        value: {
            id: string;
            value: number;
            hashLock: string;
            withdrawalFeeCurrency: string;
            withdrawalFeeAmount: number;
            transactionFeeCurrency: string;
            transactionFeeAmount: number;
            ethereumAddress: string;
        };
        key: string;
    };
}

const DB_NAME = "web3portal";
const DB_VERSION = 2;
export const DEPOSIT_SESSION_STORE = "session";
export const WITHDRAW_SESSION_STORE = "withdraw_session";

export default class IndexedDB {
    private static instance: IndexedDB;

    private db: IDBPDatabase<DB1 | DB2> | null = null;

    private constructor() {
        this.openDatabase();
    }

    public static getInstance(): IndexedDB {
        if (!IndexedDB.instance) {
            IndexedDB.instance = new IndexedDB();
        }

        return IndexedDB.instance;
    }

    private async openDatabase() {
        this.db = await openDB<DB1 | DB2>(DB_NAME, DB_VERSION, {
            upgrade: (db, oldVersion, newVersion, transaction, event) => {
                if (oldVersion < 1) {
                    db.createObjectStore(DEPOSIT_SESSION_STORE, {
                        keyPath: "id"
                    });
                }
                if (oldVersion < 2) {
                    db.createObjectStore(WITHDRAW_SESSION_STORE, {
                        keyPath: "id"
                    });
                }
            }
        });

        return this.db;
    }

    public transaction(storeNames: any, mode?: any) {
        if (this.db === null) {
            throw new Error("DB is not available");
        }

        return this.db.transaction(storeNames, mode);
    }
}
