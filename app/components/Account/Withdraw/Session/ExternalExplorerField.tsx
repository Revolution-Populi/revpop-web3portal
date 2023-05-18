import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import Session from "../../../../Context/EES/Domain/Withdraw/WithdrawSession";

type Params = {
    session: Session;
};

export default function ExternalExplorerField({session}: Params) {
    return (
        <tr>
            <td></td>
            <td>
                <a
                    target="_blank"
                    href={`https://goerli.etherscan.io/tx/${session.id}`}
                >
                    <Translate content="deposit.session.fields.explorer_link.label" />
                </a>
            </td>
        </tr>
    );
}
