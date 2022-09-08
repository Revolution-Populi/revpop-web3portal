import React, {useState} from "react";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Row, Col} from "bitshares-ui-style-guide";
import Wallet from "./Wallet";
import Manually from "./Manually";

interface Props {
    form: any;
    hashLock: string;
    onChange: (hashLock: string) => void;
}

export default function HashLockField({form, hashLock, onChange}: Props) {
    const [walletGenerator, setWalletGenerator] = useState(true);

    function onActivateWalletGenerator() {
        setWalletGenerator(true);
    }

    function onActivateManuallyMethod() {
        setWalletGenerator(false);
    }

    if (walletGenerator) {
        return (
            <>
                <Wallet onChange={onChange} />
                <Row className="generator-switcher">
                    <Col
                        span={20}
                        offset={4}
                        onClick={onActivateManuallyMethod}
                    >
                        {counterpart.translate(
                            "deposit.form.hash_lock_generator.manually"
                        )}
                    </Col>
                </Row>
            </>
        );
    }

    return (
        <>
            <Manually form={form} hashLock={hashLock} onChange={onChange} />
            <Row className="generator-switcher">
                <Col span={20} offset={4} onClick={onActivateWalletGenerator}>
                    {counterpart.translate(
                        "deposit.form.hash_lock_generator.by_wallet"
                    )}
                </Col>
            </Row>
        </>
    );
}
