import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import {Link, useRouteMatch} from "react-router-dom";

export default function Selector() {
    const {url} = useRouteMatch();

    return (
        <>
            <div className="text-center deposit-selector">
                <Translate content="deposit.selector.title" component="h4" />
            </div>
            <div className="deposit-selector__types">
                <div className="deposit-selector__type">
                    <Link to={`${url}/metamask`}>
                        <Translate content="deposit.selector.metamask" />
                    </Link>
                </div>
                <div className="deposit-selector__type">
                    <Link to={`${url}/manually`}>
                        <Translate content="deposit.selector.manually" />
                    </Link>
                </div>
            </div>
        </>
    );
}
