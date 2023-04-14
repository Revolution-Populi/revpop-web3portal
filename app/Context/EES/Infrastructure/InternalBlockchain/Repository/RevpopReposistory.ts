// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";
import PrivateKeyStore from "../../../../../stores/PrivateKeyStore";
import Contract from "../../../Domain/InternalBlockchain/Contract";
import InternalBlockchainRepositoryInterface from "../../../Domain/InternalBlockchain/RepositoryInterface";

export default class RevpopRepository
    implements InternalBlockchainRepositoryInterface {
    async loadContractsByAccount(account: string): Promise<Contract[]> {
        const revpopContracts = await Apis.instance()
            .db_api()
            .exec("get_htlc_by_to", [account, "1.16.0", 100]);

        const contracts: Contract[] = [];

        for (const contract of revpopContracts) {
            // Try to remove this dependency. Use only revpopjs package and Aes library from it. Method: decrypt_with_checksum
            const {text, isMine} = PrivateKeyStore.decodeMemo(contract.memo);
            contracts.push(new Contract(contract.id, text));
        }

        return contracts;
    }
}
