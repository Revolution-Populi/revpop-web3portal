import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
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

    return (
        <>
            <div className="text-center">
                <Translate content="deposit.title" component="h4" />
            </div>
            <p>
                {
                    'For manually deposit funds you\'ll need call HTLC contract method in your wallet. For example: "MyEtherWallet":'
                }
            </p>
            <ul>
                <li>{'Select "Interact with contract"'}</li>
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
                    On the next step select &quot;New Contract&quot; function.
                    It is required 4 parameters:
                    <ul>
                        <li>
                            Receiver: 0x9B1EaAe87cC3A041c4CEf02386109D6aCE4E198E
                        </li>
                        <li>
                            Hashlock. It can be generated manually or by the
                            wallet. <br />
                            What is &quot;Secret&quot;?
                            <ul>
                                <li>
                                    &quot;Secret&quot; is 32 bytes long string
                                    appended with &quot;0x&quot; characters
                                </li>
                                <li>
                                    It will be used to receive RVETH or to
                                    refund ETH. You should save it in a safe
                                    place.
                                </li>
                                <li>
                                    Don&apos;t use it when you call &quot;New
                                    Contract&quot; function.
                                </li>
                            </ul>
                            What is &quot;Hashlock&quot;?
                            <ul>
                                <li>
                                    &quot;Hashlock&quot; is 32 bytes long string
                                    appended with &quot;0x&quot; characters
                                </li>
                                <li>
                                    It is generated from &quot;Secret&quot; by
                                    using sha256 hash function
                                </li>
                                <li>
                                    Use it when you call &quot;New
                                    Contract&quot; function.
                                </li>
                            </ul>
                            Instructions for manually generation:
                            <ul>
                                <li>
                                    Generate random 64 characters length hex
                                    string. It will be the &quot;Secret&quot;
                                </li>
                                <li>
                                    Apply sha256 hash algorithm to the
                                    &quot;Secret&quot;. It will be the
                                    &quot;Hashlock&quot;
                                </li>
                                <li>
                                    Add &quot;0x&quot; characters to the
                                    beginning of the &quot;Hashlock&quot;
                                </li>
                                <li>
                                    &quot;Hashlock&quot; is ready. You can use
                                    it in the &quot;hashlock&quot; field.
                                </li>
                            </ul>
                            Generate by the wallet:
                            <ul>
                                <li>
                                    <SecretHash />
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Timelock />
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    );
}
