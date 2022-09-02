import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import {Link, useRouteMatch} from "react-router-dom";
import Abi from "../../../../../assets/abi/HashedTimelock.json";
import SecretHash from "./SecretHash";
import Timelock from "./Timelock";

export default function Index() {
    async function onCopyApiHandler(
        event: React.MouseEvent<HTMLAnchorElement>
    ) {
        event.preventDefault();
        await window.navigator.clipboard.writeText(JSON.stringify(Abi));
    }

    const {url, path} = useRouteMatch();
    console.log(url, path);

    return (
        <>
            <div className="text-center">
                <Translate content="deposit.title" component="h4" />
            </div>
            <p>
                To manually generate and receive RVETH for use in the system,
                you&apos;ll need to call an HTLC contract method in an Ethereum
                compatible wallet. For example: &quot;MyEtherWallet&quot;:
            </p>
            <ul>
                <li>Select &quot;Interact with contract&quot;</li>
                <li>
                    Use &quot;0x8509C2c215373e7dA48bcB2745AEDA6BC9096144&quot;
                    as the contract address
                </li>
                <li>
                    <a href="#" onClick={onCopyApiHandler}>
                        Copy to the clipboard abi contract interface
                    </a>{" "}
                    and paste it to the &quot;ABI/JSON Interface&quot; field
                </li>
                <li>Click &quot;Interact&quot;</li>
                <li>
                    For the next step select the &quot;New Contract&quot;
                    function. It is required 3 parameters (Receiver, Hashlock
                    and Timelock):
                    <ul>
                        <li>
                            Receiver: 0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E
                        </li>
                        <li>
                            Hashlock. It can be generated manually or by the
                            wallet from the &quot;Secret&quot;. <br />
                            What is &quot;Secret&quot;?
                            <ul>
                                <li>
                                    &quot;Secret&quot; is 32 bytes long string
                                    appended with &quot;0x&quot; characters.
                                </li>
                                <li>
                                    It will be used to receive RVETH or to
                                    refund ETH.
                                </li>
                                <li>
                                    Don&apos;t use it when you call &quot;New
                                    Contract&quot; function.
                                </li>
                                <li>You should save it in a safe place.</li>
                            </ul>
                            What is &quot;Hashlock&quot;?
                            <ul>
                                <li>
                                    &quot;Hashlock&quot; is a 32 bytes long
                                    string beginning with &quot;0x&quot;
                                    characters.
                                </li>
                                <li>
                                    It is generated from &quot;Secret&quot; by
                                    using sha256 hash function.
                                </li>
                                <li>
                                    Use it when you call &quot;New
                                    Contract&quot; function.
                                </li>
                                <li>You should save it in a safe place.</li>
                            </ul>
                            To generate by the wallet:
                            <ul>
                                <li>
                                    <SecretHash />
                                </li>
                            </ul>
                            To generate manually:
                            <ul>
                                <li>
                                    Create a random 64 characters length hex
                                    string. It will be the &quot;Secret&quot;.
                                </li>
                                <li>
                                    Apply sha256 hash algorithm to the
                                    &quot;Secret&quot;. The result of the hash
                                    algorithm be the &quot;Hashlock&quot;.
                                </li>
                                <li>
                                    Add &quot;0x&quot; characters to the
                                    beginning of the &quot;Hashlock&quot;.
                                </li>
                                <li>
                                    The &quot;Hashlock&quot; is now ready. You
                                    can use it in the &quot;hashlock&quot;
                                    field.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Timelock />
                        </li>
                    </ul>
                </li>
                <li>Click &quot;Write&quot;</li>
                <li>
                    You will see &quot;Transaction Confirmation&quot; window.
                </li>
                <li>Check all information.</li>
                <li>Then click &quot;Confirm & Send&quot;</li>
                <li>
                    After the transaction is completed click the &quot;View on
                    Etherscan&quot; link
                </li>
                <li>Copy &quot;Transaction Hash&quot; field</li>
                <li>
                    Send &quot;Transaction hash&quot;, &quot;HashLock&quot; from
                    this page:&nbsp;
                    <Link to="/deposit/new/send_tx_hash">
                        Send transaction hash
                    </Link>
                </li>
                <li>You should receive your RVETH in your wallet</li>
            </ul>
        </>
    );
}
