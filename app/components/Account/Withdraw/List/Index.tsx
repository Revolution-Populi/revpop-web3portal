import React from "react";
// @ts-ignore
import {Link, useRouteMatch} from "react-router-dom";
// @ts-ignore
import Translate from "react-translate-component";
import Sessions from "./Sessions";

export default function Deposits() {
    const {url} = useRouteMatch();

    return (
        <>
            <div className="grid-content sessions">
                <div className="actions">
                    <Link to={`${url}/new`} className="button primary">
                        <span>
                            <Translate content="deposit.title" />
                        </span>
                    </Link>
                </div>
                <Sessions />
            </div>
        </>
    );
}
