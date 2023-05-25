// @ts-ignore
import {Aes, TransactionHelper} from "@revolutionpopuli/revpopjs";

export default class Memo {
    public generate(
        message: string,
        accountFromPrivateKey: any,
        accountFrom: any,
        accountTo: any
    ) {
        const accountFromPublicKey = this.getPublicKey(accountFrom);
        const accountToPublicKey = this.getPublicKey(accountTo);
        const nonce = TransactionHelper.unique_nonce_uint64();

        return {
            from: accountFromPublicKey,
            to: accountToPublicKey,
            nonce: nonce,
            message: this.encryptMessage(
                accountFromPrivateKey,
                accountToPublicKey,
                nonce,
                message
            )
        };
    }

    public getPublicKey(account: any) {
        let publicKey = account.getIn(["options", "memo_key"]);
        if (/111111111111111111111/.test(publicKey)) {
            publicKey = null;
        }

        return publicKey;
    }

    private encryptMessage(
        accountFromPrivateKey: any,
        accountToPublicKey: any,
        nonce: number,
        message: string
    ) {
        return Aes.encrypt_with_checksum(
            accountFromPrivateKey,
            accountToPublicKey,
            nonce,
            message
        );
    }
}
