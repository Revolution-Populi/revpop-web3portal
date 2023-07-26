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
import {useHistory} from "react-router-dom";

interface Params {
    session: WithdrawSession;
    refresh: () => void;
}

export default function CreateNewWithdrawButton({session, refresh}: Params) {
    const [isCreating, setIsCreating] = useState(false);
    const history = useHistory();

    async function onClick() {
        const query = new MakeWithdraw(session.id);
        try {
            setIsCreating(true);
            const result = await makeWithdrawHandler.execute(query);

            if (result) {
                Notification.info({
                    message: counterpart.translate(
                        "withdraw.session.warnings.waiting_for_contract_creation_in_internal_blockchain"
                    ),
                    duration: 10
                });
                refresh();
            } else {
                history.push("/withdraw/new");
                setIsCreating(false);
            }
        } catch (e) {
            setIsCreating(false);
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
