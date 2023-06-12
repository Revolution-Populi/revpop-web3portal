import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import CheckDepositContractCreatedHandler from "../../../../Context/EES/Application/Command/CheckDepositContractCreated/CheckDepositContractCreatedHandler";
import CheckDepositContractCreated from "../../../../Context/EES/Application/Command/CheckDepositContractCreated/CheckDepositContractCreated";
// @ts-ignore
import {Notification} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import UnlockButton from "../../../UnlockButton/UnlockButton";

type Params = {
    sessionId: string;
    refresh: () => void;
};

function CheckWithdrawContractCreatedButton({sessionId, refresh}: Params) {
    async function onClick() {
        const query = new CheckDepositContractCreated(sessionId);
        const handler = await CheckDepositContractCreatedHandler.create();
        const result = await handler.execute(query);

        if (result) {
            refresh();
        } else {
            Notification.warning({
                message: counterpart.translate(
                    "withdraw.session.warnings.transaction_is_pending"
                )
            });
        }
    }

    return (
        <UnlockButton>
            <a className="button" onClick={onClick}>
                <Translate content="deposit.session.actions.check_deposit_contract_created" />
            </a>
        </UnlockButton>
    );
}

export default CheckWithdrawContractCreatedButton;
