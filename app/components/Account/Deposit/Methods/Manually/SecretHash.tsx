import React, {useState} from "react";
import crypto from "crypto";
// @ts-ignore
import {Input} from "bitshares-ui-style-guide";

interface SecretHashPair {
    secret: string;
    hash: string | null;
}

const SECRET_LENGTH = 64;

export default function SecretHash() {
    const [secretHashPair, setHashSecretPair] = useState<SecretHashPair>();

    function onGenerateSecretHandler() {
        const secret = crypto.randomBytes(32);
        setHashSecretPair(generateSecretHashPair(secret));
    }

    function generateSecretHashPair(secret: Buffer): SecretHashPair {
        const bufferToString = (b: Buffer) => "0x" + b.toString("hex");

        const hash = crypto
            .createHash("sha256")
            .update(secret)
            .digest();

        return {
            secret: bufferToString(secret),
            hash: bufferToString(hash)
        };
    }

    function onChangeSecretHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        const hash = value.substring(2);

        if (!/[0-9A-Fa-f]{64}/g.test(hash)) {
            setHashSecretPair({
                secret: value,
                hash: null
            });
            return;
        }

        const secret = Buffer.from(hash, "hex");
        const secretHashPair = generateSecretHashPair(secret);

        setHashSecretPair(secretHashPair);
    }

    if (!secretHashPair) {
        return (
            <a href="#" onClick={onGenerateSecretHandler}>
                Generate secret/hashlock pair
            </a>
        );
    }

    return (
        <>
            <a href="#" onClick={onGenerateSecretHandler}>
                Generate random secret/hashlock pair
            </a>
            <ul>
                <li>
                    Secret (allowed only hexadecimal symbols):
                    <Input
                        value={secretHashPair.secret}
                        addonAfter={secretHashPair.secret.length}
                        onChange={onChangeSecretHandler}
                    />
                </li>
                {secretHashPair.hash && (
                    <li>Hahslock: {secretHashPair.hash}</li>
                )}
            </ul>
        </>
    );
}
