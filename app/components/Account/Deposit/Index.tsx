import React from "react";
// @ts-ignore
import counterpart from "counterpart";
// @ts-ignore
import {Route, Switch, useRouteMatch} from "react-router-dom";
import HelpContent from "../../Utility/HelpContent";
import Deposits from "./List/Index";
import Metamask from "./Metamask/Index";

export default function Index() {
    const {path} = useRouteMatch();

    return (
        <div className="deposit-page">
            <div className="grid-content">
                <HelpContent path={"components/Deposit"} />
            </div>

            <div className="grid-block">
                <Switch>
                    <Route path={`${path}`} exact>
                        <Deposits />
                    </Route>
                    <Route path={`${path}/new`} exact>
                        <div className="grid-block align-center">
                            <div className="deposit-form">
                                <Metamask />
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}
