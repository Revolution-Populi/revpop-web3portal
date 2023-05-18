import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
// @ts-ignore
import {connect} from "alt-react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import {
    Form,
    Button,
    Input,
    Tooltip,
    Notification
    // @ts-ignore
} from "bitshares-ui-style-guide";
import {WithdrawSession} from "../../../../../Context/EES";
import HtlcActions from "../../../../../actions/HtlcActions";
import counterpart from "counterpart";
import RedeemWithdraw from "../../../../../Context/EES/Application/Command/RedeemWithdraw/RedeemWithdraw";
import AccountStore from "../../../../../stores/AccountStore";
import RedeemWithdrawHandler from "../../../../../Context/EES/Application/Command/RedeemWithdraw/RedeemWithdrawHandler";
import {UseCaseError} from "../../../../../Context/Core/Logic/AppError";
import "../../../../../assets/stylesheets/components/withdraw/_htlc.scss";

interface Props {
    withdraw: WithdrawSession;
}

interface PreimageProps {
    preimageHash: string;
    onAction: (preimage: string) => void;
}

function Preimage({preimageHash, onAction}: PreimageProps) {
    const [preimage, setPreimage] = useState<string>("");
    const [preimageHashCalculated, setPreimageHashCalculated] = useState<
        string | null
    >(null);
    const [hashMatch, setHashMatch] = useState<boolean | null>(null);

    useEffect(() => {
        const {hash} = HtlcActions.calculateHash(preimage, "sha256");
        setPreimageHashCalculated(hash);

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
        <Form.Item label={counterpart.translate("htlc.preimage")}>
            <Input.Group className="content-block transfer-input preimage-row">
                <Tooltip
                    title={counterpart.translate(
                        "showcases.htlc.tooltip.enter_preimage"
                    )}
                    mouseEnterDelay={0.5}
                >
                    <Input
                        style={{
                            width: "60%",
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
                        style={{width: "78%"}}
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

function RedeemForm({withdraw}: Props) {
    const history = useHistory();
    const [preimage, setPreimage] = useState<string | null>(null);

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const command = new RedeemWithdraw(
            withdraw.externalContract?.id as string,
            withdraw.ethereumAddress,
            preimage as string,
            withdraw.id
        );

        const handler = RedeemWithdrawHandler.create();

        try {
            await handler.execute(command);
            history.push(`/withdraw/${withdraw.id}`);
        } catch (e) {
            if (e instanceof UseCaseError) {
                Notification.error(e.message);
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="withdraw-form">
            <Preimage preimageHash={withdraw.hashLock} onAction={setPreimage} />
            <Form.Item wrapperCol={{span: 17, offset: 7}}>
                <Button type="primary" htmlType="submit">
                    <Translate content="transfer.send" />
                </Button>
            </Form.Item>
        </Form>
    );
}

const RedeemFormWrapped = Form.create({name: "redeemForm"})(RedeemForm);

export default connect(RedeemFormWrapped, {
    listenTo() {
        return [AccountStore];
    },
    getProps(props: any) {
        return {
            selectedAccountName: AccountStore.getState().currentAccount
        };
    }
});
