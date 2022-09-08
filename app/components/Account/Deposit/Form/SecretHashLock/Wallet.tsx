import React, {useEffect, useState} from "react";
import crypto from "crypto";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Form, Input, Button, Tooltip, Icon} from "bitshares-ui-style-guide";

interface Props {
    onChange: (hasLock: string) => void;
}

interface SecretHashLogPair {
    secret: string;
    hashLock: string;
}

const HASH_BYTES_LENGTH = 32;

export default function Wallet({onChange}: Props) {
    const [secretHashLockPair, setSecretHashLockPair] = useState<
        SecretHashLogPair
    >();

    useEffect(() => {
        const secretHashLockPair = generateSecretHashLockPair();
        onChange(secretHashLockPair.hashLock);
        setSecretHashLockPair(secretHashLockPair);
    }, []);

    function generateSecret(): Buffer {
        return crypto.randomBytes(HASH_BYTES_LENGTH);
    }

    function generateHashLockFromSecret(secret: Buffer): Buffer {
        return crypto
            .createHash("sha256")
            .update(secret)
            .digest();
    }

    function generateSecretHashLockPair(): SecretHashLogPair {
        function bufferToString(b: Buffer): string {
            return "0x" + b.toString("hex");
        }

        const secret = generateSecret();
        const hashLock = generateHashLockFromSecret(secret);
        return {
            secret: bufferToString(secret),
            hashLock: bufferToString(hashLock)
        };
    }

    if (!secretHashLockPair) {
        return null;
    }

    function onRefreshSecretHandler() {
        const secretHashLockPair = generateSecretHashLockPair();
        setSecretHashLockPair(secretHashLockPair);
        onChange(secretHashLockPair.hashLock);
    }

    async function onCopySecretHandler() {
        await window.navigator.clipboard.writeText(
            secretHashLockPair?.secret as string
        );
    }

    async function onCopyHashLockHandler() {
        await window.navigator.clipboard.writeText(
            secretHashLockPair?.hashLock as string
        );
    }

    const secretFieldButtons = (
        <>
            <Button type="primary" onClick={onRefreshSecretHandler}>
                <Icon type="reload" />
            </Button>
            <Button type="primary" onClick={onCopySecretHandler}>
                <Icon type="copy" />
            </Button>
        </>
    );

    const hashLockFieldButtons = (
        <Button type="primary" onClick={onCopyHashLockHandler}>
            <Icon type="copy" />
        </Button>
    );

    const secretLabel = (
        <>
            {counterpart.translate("deposit.form.secret.label")}
            <Tooltip
                title={counterpart.translate("deposit.form.secret.tooltip")}
            >
                <Icon type="question-circle" />
            </Tooltip>
        </>
    );

    const hashLockLabel = (
        <>
            {counterpart.translate("deposit.form.hash_lock.label")}
            <Tooltip
                title={counterpart.translate("deposit.form.hash_lock.tooltip")}
            >
                <Icon type="question-circle" />
            </Tooltip>
        </>
    );

    return (
        <>
            <Form.Item label={secretLabel}>
                <Input
                    className="field"
                    value={secretHashLockPair.secret}
                    addonAfter={secretFieldButtons}
                    disabled
                />
            </Form.Item>
            <Form.Item label={hashLockLabel}>
                <Input
                    className="field"
                    value={secretHashLockPair.hashLock}
                    addonAfter={hashLockFieldButtons}
                    disabled
                />
            </Form.Item>
        </>
    );
}
