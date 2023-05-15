import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import Session, {STATUS} from "../../../../Context/Withdraw/Domain/Session";

type Params = {
    session: Session;
};

export default function ExternalExplorerField({session}: Params) {
    if (session.status < STATUS.PAYED) {
        return null;
    }

    return (
        <tr>
            <td></td>
            <td>
                <a
                    target="_blank"
                    href={`https://goerli.etherscan.io/tx/${session.externalContract?.txHash}`}
                >
                    <Translate content="deposit.session.fields.explorer_link.label" />
                </a>
            </td>
        </tr>
    );
}
