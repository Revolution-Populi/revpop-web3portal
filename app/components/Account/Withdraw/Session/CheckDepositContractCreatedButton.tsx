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

const handler = CheckDepositContractCreatedHandler.create();

function CheckDepositContractCreatedButton({sessionId, refresh}: Params) {
    async function onClick() {
        const query = new CheckDepositContractCreated(sessionId);
        const result = await handler.execute(query);

        if (result) {
            refresh();
        } else {
            Notification.error({
                message: counterpart.translate(
                    "deposit.session.errors.contract_not_found"
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

export default CheckDepositContractCreatedButton;
