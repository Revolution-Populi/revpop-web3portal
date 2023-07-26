import React, {useEffect, useState} from "react";
import HtlcActions from "../../../../../actions/HtlcActions";
import counterpart from "counterpart";
// @ts-ignore
import {
    Form,
    Input,
    Tooltip
    // @ts-ignore
} from "bitshares-ui-style-guide";

interface PreimageProps {
    preimageHash: string;
    onAction: (preimage: string) => void;
}

function Preimage({preimageHash, onAction}: PreimageProps) {
    const [preimage, setPreimage] = useState<string>("");
    const [hashMatch, setHashMatch] = useState<boolean | null>(null);

    useEffect(() => {
        const {hash} = HtlcActions.calculateHash(preimage, "sha256");

        if (hash == preimageHash) {
            setHashMatch(true);
            onAction(preimage);
        } else {
            setHashMatch(false);
        }
    }, [preimage]);

    function onInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setPreimage(event.target.value);
    }

    return (
        <Form.Item
            label={counterpart.translate("showcases.htlc.label_enter_preimage")}
        >
            <Input.Group className="content-block transfer-input preimage-row">
                <Tooltip
                    title={counterpart.translate(
                        "showcases.htlc.tooltip.enter_preimage"
                    )}
                    mouseEnterDelay={0.5}
                >
                    <Input
                        style={{
                            width: "100%",
                            color:
                                hashMatch == null
                                    ? undefined
                                    : hashMatch
                                    ? "green"
                                    : "red"
                        }}
                        name="preimage"
                        id="preimage"
                        type="text"
                        onChange={onInputChanged}
                        value={preimage}
                        placeholder={counterpart.translate(
                            "showcases.htlc.enter_secret_preimage"
                        )}
                    />
                </Tooltip>
            </Input.Group>

            <Input.Group className="content-block transfer-input preimage-row">
                <Tooltip
                    title={counterpart.translate(
                        "showcases.htlc.tooltip.preimage_hash"
                    )}
                    mouseEnterDelay={0.5}
                >
                    <Input
                        style={{width: "100%"}}
                        name="hash"
                        id="hash"
                        type="text"
                        value={preimageHash}
                        placeholder={counterpart.translate(
                            "showcases.htlc.hash"
                        )}
                        disabled={true}
                    />
                </Tooltip>
            </Input.Group>
        </Form.Item>
    );
}

export default Preimage;
