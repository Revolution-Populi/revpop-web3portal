import {storageAPIs} from "../../../api/apiConfig";
import Storage from "../../Model/Storage";

class ApiConfigRepository {
    constructor() {
        const storages = [];

        for (const [type, items] of Object.entries(storageAPIs.API_NODE_LIST)) {
            storages.push(
                ...items.map(storage => {
                    return new Storage(
                        storage.id,
                        storage.name,
                        type,
                        storage.active,
                        storage.connection
                    );
                })
            );
        }

        this.storages = storages;
    }

    findAll() {
        return this.storages.filter(storage => {
            return storage.active;
        });
    }

    find(storageId) {
        const storage = this.storages.find(storage => {
            return storage.id === storageId;
        });

        if (undefined === storage) {
            return null;
        }

        return storage;
    }
}

export default new ApiConfigRepository();
