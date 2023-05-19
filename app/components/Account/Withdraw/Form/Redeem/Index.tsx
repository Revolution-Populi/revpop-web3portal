import React, {useState} from "react";
import {useHistory} from "react-router-dom";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import {
    Form,
    Button,
    Input,
    Tooltip,
    Modal,
    Notification
    // @ts-ignore
} from "bitshares-ui-style-guide";
import {WithdrawSession} from "../../../../../Context/EES";
import counterpart from "counterpart";
import RedeemWithdrawHandler from "../../../../../Context/EES/Application/Command/RedeemWithdraw/RedeemWithdrawHandler";
import {UseCaseError} from "../../../../../Context/Core/Logic/AppError";
import "../../../../../assets/stylesheets/components/withdraw/_htlc.scss";
import RedeemWithdraw from "../../../../../Context/EES/Application/Command/RedeemWithdraw/RedeemWithdraw";
import UnlockButton from "../../../../UnlockButton/UnlockButton";
import ExternalWalletButton from "../../../../ExternalWalletButton/ExternalWalletButton";
import Preimage from "./Preimage";

interface RedeemFormProps {
    withdraw: WithdrawSession;
    isModalVisible: boolean;
    hideModal: () => void;
}

function RedeemForm({withdraw, isModalVisible, hideModal}: RedeemFormProps) {
    const [preimage, setPreimage] = useState<string | null>(null);
    const [isSending, setIsSending] = useState<boolean>(false);

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsSending(true);
        const command = new RedeemWithdraw(
            withdraw.externalContract?.id as string,
            withdraw.ethereumAddress,
            preimage as string,
            withdraw.id
        );

        const handler = RedeemWithdrawHandler.create();

        try {
            await handler.execute(command);
            window.location.reload();
        } catch (e) {
            console.log("Error: ", e);
            if (e instanceof UseCaseError) {
                Notification.error({
                    message: e.message
                });
            }
        }
    }

    return (
        <Modal
            title={counterpart.translate("showcases.htlc.redeem_htlc")}
            visible={isModalVisible}
            overlay={true}
            onCancel={hideModal}
            footer={
                <>
                    <ExternalWalletButton
                        content={currentAddress => (
                            <UnlockButton key={"send"}>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={
                                        currentAddress.toUpperCase() !==
                                            withdraw.ethereumAddress.toUpperCase() ||
                                        !preimage ||
                                        isSending
                                    }
                                >
                                    <Translate
                                        content={
                                            isSending
                                                ? "transfer.sending"
                                                : "transfer.send"
                                        }
                                    />
                                </Button>
                            </UnlockButton>
                        )}
                    />
                    <Button
                        key="Cancel"
                        onClick={hideModal}
                        disabled={isSending}
                    >
                        <Translate component="span" content="transfer.cancel" />
                    </Button>
                </>
            }
        >
            <Form onSubmit={handleSubmit} className="withdraw-form">
                <Preimage
                    preimageHash={withdraw.hashLock}
                    onAction={setPreimage}
                />
            </Form>
        </Modal>
    );
}

export default RedeemForm;
