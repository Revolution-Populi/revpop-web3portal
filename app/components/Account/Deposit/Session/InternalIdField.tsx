import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import Session, {STATUS} from "../../../../Context/EES/Domain/Deposit/Session";

type Params = {
    session: Session;
};

export default function InternalIdField({session}: Params) {
    if (session.status < STATUS.CREATED_INTERNAL_BLOCKCHAIN) {
        return null;
    }

    return (
        <tr>
            <td>
                <Translate content="deposit.session.fields.internal_htlc_id.label" />
            </td>
            <td>{session.internalContract?.id}</td>
        </tr>
    );
}
