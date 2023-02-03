import React from "react";
import counterpart from "counterpart";
import {
    MakeDeposit,
    makeDepositHandler,
    Session
} from "../../../../Context/Deposit";

interface Params {
    session: Session;
}

export default function CreateNewExternalContractButton({session}: Params) {
    async function onClick() {
        const query = new MakeDeposit("metamask", session.id);
        await makeDepositHandler.execute(query);

        // console.log(sessionsOrError);
        console.log(query);
    }

    return (
        <a onClick={onClick} className="button primary">
            <span>
                {counterpart.translate(
                    "deposit.session.actions.create_new_external_contract"
                )}
            </span>
        </a>
    );
}
