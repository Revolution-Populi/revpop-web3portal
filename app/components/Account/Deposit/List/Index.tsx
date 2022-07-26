import React, {useEffect, useState} from "react";
// @ts-ignore
import {Link, useRouteMatch} from "react-router-dom";
// @ts-ignore
import counterpart from "counterpart";
import HTLC from "../../../../Context/Deposit/Domain/HTLC";
import {getLastHTLC} from "../../../../Context/Deposit/Facade";

export default function Deposits() {
    const {url} = useRouteMatch();
    const [htlc, setHTLC] = useState<HTLC | null>(null);

    useEffect(() => {
        async function load() {
            const lastHTLC = await getLastHTLC();
            setHTLC(lastHTLC);
        }

        load();
    }, []);

    return (
        <>
            <div className="grid-content">
                <div className="actions">
                    <Link to={`${url}/new`} className="button primary">
                        {counterpart("deposit.new")}
                    </Link>
                </div>
                <div className="deposits">Deposits</div>
            </div>
        </>
    );
}
