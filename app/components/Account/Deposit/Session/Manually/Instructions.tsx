import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
// @ts-ignore
import Translate from "react-translate-component";
import counterpart from "counterpart";
// @ts-ignore
import {Collapse} from "bitshares-ui-style-guide";
import {Session} from "../../../../../Context/Deposit";
import Abi from "../../../../../assets/abi/HashedTimelock.json";
import useLoadDepositSettings from "../../Hooks/useLoadDepositSettings";

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

interface Params {
    session: Session;
}

export default function Index({session}: Params) {
    const [settings, error] = useLoadDepositSettings();

    if (null === settings) {
        return <div>Loading...</div>;
    }

    async function onCopyApiHandler(
        event: React.MouseEvent<HTMLAnchorElement>
    ) {
        event.preventDefault();
        await window.navigator.clipboard.writeText(JSON.stringify(Abi));
    }

    return (
        <Collapse bordered={false}>
            <Collapse.Panel
                header={counterpart("deposit.manually.instructions.label")}
                key="1"
            >
                <div className="manually">
                    <div className="text-center">
                        <Translate content="deposit.title" component="h4" />
                    </div>
                    <p>
                        To manually generate and receive RVETH for use in the
                        system, you&apos;ll need to call an HTLC contract method
                        in an Ethereum compatible wallet. For example:
                        &quot;MyEtherWallet&quot;:
                    </p>
                    <ul>
                        <li>Select &quot;Interact with contract&quot;</li>
                        <li>
                            Use &quot;{settings.contractAddress}&quot; as the
                            contract address
                        </li>
                        <li>
                            <a href="#" onClick={onCopyApiHandler}>
                                Copy to the clipboard abi contract interface
                            </a>{" "}
                            and paste it to the &quot;ABI/JSON Interface&quot;
                            field
                        </li>
                        <li>Click &quot;Interact&quot;</li>
                        <li>
                            For the next step select the &quot;New
                            Contract&quot; function. It is required 3 parameters
                            (Receiver, Hashlock and Timelock):
                            <ul>
                                <li>Receiver: {settings.receiverAddress}</li>
                                <li>
                                    Hashlock: {session.hashLock}
                                    <div>
                                        It can be generated manually or by the
                                        wallet from the &quot;Secret&quot;.{" "}
                                        <br />
                                        What is &quot;Secret&quot;?
                                    </div>
                                    <ul>
                                        <li>
                                            &quot;Secret&quot; is 32 bytes long
                                            string appended with &quot;0x&quot;
                                            characters.
                                        </li>
                                        <li>
                                            It will be used to receive RVETH or
                                            to refund ETH.
                                        </li>
                                        <li>
                                            Don&apos;t use it when you call
                                            &quot;New Contract&quot; function.
                                        </li>
                                        <li>
                                            You should save it in a safe place.
                                        </li>
                                    </ul>
                                    What is &quot;Hashlock&quot;?
                                    <ul>
                                        <li>
                                            &quot;Hashlock&quot; is a 32 bytes
                                            long string beginning with
                                            &quot;0x&quot; characters.
                                        </li>
                                        <li>
                                            It is generated from
                                            &quot;Secret&quot; by using sha256
                                            hash function.
                                        </li>
                                        <li>
                                            Use it when you call &quot;New
                                            Contract&quot; function.
                                        </li>
                                        <li>
                                            You should save it in a safe place.
                                        </li>
                                    </ul>
                                    To generate manually:
                                    <ul>
                                        <li>
                                            Create a random 64 characters length
                                            hex string. It will be the
                                            &quot;Secret&quot;.
                                        </li>
                                        <li>
                                            Apply sha256 hash algorithm to the
                                            &quot;Secret&quot;. The result of
                                            the hash algorithm be the
                                            &quot;Hashlock&quot;.
                                        </li>
                                        <li>
                                            Add &quot;0x&quot; characters to the
                                            beginning of the
                                            &quot;Hashlock&quot;.
                                        </li>
                                        <li>
                                            The &quot;Hashlock&quot; is now
                                            ready. You can use it in the
                                            &quot;hashlock&quot; field.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <div>
                                        &quot;Timelock&quot;: This is the period
                                        of time that the smart contract will be
                                        locked. <br />
                                        After this Timelock period expires you
                                        can call a refund if you have not
                                        received RVETH
                                    </div>
                                    <div>
                                        Unix time: {session.timeLock.unix()}
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>Click &quot;Write&quot;</li>
                        <li>
                            You will see &quot;Transaction Confirmation&quot;
                            window.
                        </li>
                        <li>Check all information.</li>
                        <li>Then click &quot;Confirm & Send&quot;</li>
                        <li>
                            After the transaction is completed click the
                            &quot;View on Etherscan&quot; link
                        </li>
                        <li>Send &quot;Transaction hash&quot; below</li>
                        <li>You should receive your RVETH in your wallet</li>
                    </ul>
                </div>
            </Collapse.Panel>
        </Collapse>
    );
}
