// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";
import PrivateKeyStore from "../../../../../stores/PrivateKeyStore";
import Contract from "../../../Domain/InternalBlockchain/Contract";
import InternalBlockchainRepositoryInterface from "../../../Domain/InternalBlockchain/RepositoryInterface";
import {
    FetchChain,
    TransactionBuilder
    // @ts-ignore
} from "@revolutionpopuli/revpopjs";
import WalletDb from "../../../../../stores/WalletDb";
import {EESSettings} from "../../../Domain/EES/RepositoryInterface";
import {Map} from "immutable";
import Memo from "../Memo";
import WithdrawSession from "../../../Domain/Withdraw/WithdrawSession";
import AssetNormalizer from "../../AssetNormalizer";

const PREIMAGE_HASH_CIPHER_SHA256 = 2;
const PREIMAGE_LENGTH = 32;

export default class RevpopRepository
    implements InternalBlockchainRepositoryInterface {
    constructor(private memo: Memo, private normalizer: AssetNormalizer) {}

    static create() {
        return new RevpopRepository(new Memo(), new AssetNormalizer());
    }

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

    async withdraw(settings: EESSettings, session: WithdrawSession) {
        const transactionBuilder = new TransactionBuilder();

        const revpopAsset = await this.getAsset(settings.revpopCurrency);
        const internalAccount = await FetchChain(
            "getAccount",
            session.internalAccountName
        );
        const eesAccount = await FetchChain(
            "getAccount",
            settings.eesAccountName
        );
        const withdrawalFeeAsset = await this.getAsset(
            session.withdrawalFeeCurrency
        );

        transactionBuilder.add_type_operation("transfer", {
            fee: {
                amount: 0,
                asset_id: withdrawalFeeAsset.get("id")
            },
            from: internalAccount.get("id"),
            to: eesAccount.get("id"),
            amount: {
                amount: this.normalizer.denormalize(
                    session.withdrawalFeeAmount,
                    withdrawalFeeAsset
                ),
                asset_id: withdrawalFeeAsset.get("id")
            },
            extensions: {
                memo: this.memo.generate(
                    session.id,
                    this.getPrivateKey(internalAccount),
                    internalAccount,
                    eesAccount
                )
            }
        });

        const transactionFeeAsset = await this.getAsset(
            session.transactionFeeCurrency
        );
        transactionBuilder.add_type_operation("htlc_create", {
            from: internalAccount.get("id"),
            to: eesAccount.get("id"),
            fee: {
                amount: 0,
                asset_id: transactionFeeAsset.get("id")
            },
            amount: {
                amount: this.normalizer.denormalize(session.value, revpopAsset),
                asset_id: revpopAsset.get("id")
            },
            preimage_hash: [PREIMAGE_HASH_CIPHER_SHA256, session.hashLock],
            preimage_size: PREIMAGE_LENGTH,
            claim_period_seconds: settings.withdrawTimeLock,
            extensions: {
                memo: this.memo.generate(
                    session.id,
                    this.getPrivateKey(internalAccount),
                    internalAccount,
                    eesAccount
                )
            }
        });

        WalletDb.process_transaction(
            transactionBuilder,
            null, //signer_private_keys,
            true
        );
    }

    private getPrivateKey(account: Map<string, any>) {
        const publicKey = this.memo.getPublicKey(account);
        return WalletDb.getPrivateKey(publicKey);
    }

    private async getAsset(currency: string): Promise<Map<string, any>> {
        return await FetchChain("getAsset", currency);
    }
}
