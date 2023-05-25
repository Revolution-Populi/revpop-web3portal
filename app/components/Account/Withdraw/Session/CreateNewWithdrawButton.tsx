import React, {useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";
import {
    MakeWithdraw,
    makeWithdrawHandler,
    WithdrawSession
} from "../../../../Context/EES";
// @ts-ignore
import {Notification} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import UnlockButton from "../../../UnlockButton/UnlockButton";

interface Params {
    session: WithdrawSession;
    refresh: () => void;
}

export default function CreateNewWithdrawButton({session, refresh}: Params) {
    const [isCreating, setIsCreating] = useState(false);

    async function onClick() {
        const query = new MakeWithdraw(session.id);
        try {
            Notification.info({
                message: counterpart.translate(
                    "withdraw.session.warnings.waiting_for_contract_creation_in_internal_blockchain"
                ),
                duration: 10
            });
            setIsCreating(true);
            const result = await makeWithdrawHandler.execute(query);
            if (result) {
                refresh();
            }
        } catch (e) {
            console.log("Create new external contract error");
        }
    }

    return (
        <UnlockButton>
            <button
                onClick={onClick}
                className="button ant-btn ant-btn-primary"
                disabled={isCreating}
            >
                {!isCreating && (
                    <Translate content="withdraw.session.actions.create_new_withdraw" />
                )}
                {isCreating && (
                    <Translate content="withdraw.session.actions.creating_new_withdraw" />
                )}
            </button>
        </UnlockButton>
    );
}
