import React, {useEffect, useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";
import Session, {STATUS} from "../../../../Context/EES/Domain/Deposit/Session";
import GetTransactionExplorerLinkHandler from "../../../../Context/Core/Query/GetTransactionExplorerLink/GetTransactionExplorerLinkHandler";
import GetTransactionExplorerLink from "../../../../Context/Core/Query/GetTransactionExplorerLink/GetTransactionExplorerLink";

type Params = {
    session: Session;
};

export default function ExternalExplorerField({session}: Params) {
    const [url, setUrl] = useState<string>("loading...");

    useEffect(() => {
        const handler = GetTransactionExplorerLinkHandler.create();
        handler.execute(new GetTransactionExplorerLink(session)).then(setUrl);
    }, [session.externalContract?.txHash]);

    if (session.status < STATUS.PAID || !session.externalContract || !url) {
        return null;
    }

    return (
        <tr>
            <td></td>
            <td>
                <a target="_blank" href={url} rel="noreferrer">
                    <Translate content="deposit.session.fields.explorer_link.label" />
                </a>
            </td>
        </tr>
    );
}
