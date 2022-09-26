import React from "react";
// @ts-ignore
import {Link, useRouteMatch} from "react-router-dom";
// @ts-ignore
import counterpart from "counterpart";

export default function Deposits() {
    const {url} = useRouteMatch();

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
