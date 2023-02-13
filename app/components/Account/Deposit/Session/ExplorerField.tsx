import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import Session from "../../../../Context/Deposit/Domain/Session";

type Params = {
    session: Session;
};

export default function Index({session}: Params) {
    if (session.isCreated()) {
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
