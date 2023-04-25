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
    deposit_session: {
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
    private db: IDBPDatabase<DB1 | DB2> | null = null;

    constructor() {
        this.openDatabase();
    }

    private async openDatabase() {
        this.db = await openDB<DB1 | DB2>(DB_NAME, DB_VERSION, {
            upgrade: (db, oldVersion, newVersion, transaction, event) => {
                debugger;
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
