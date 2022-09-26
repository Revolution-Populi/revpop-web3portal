import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import HelpContent from "../../Utility/HelpContent";
import Deposits from "./List/Index";
import Selector from "./Methods/Selector";
import Method from "./Methods/Index";
import Redeem from "./Redeem/Index";
import SendTxHashWrapped from "./Methods/Manually/SendTxHash";
import Session from "./Session/Index";

export default function Index() {
    const {path} = useRouteMatch();

    return (
        <div className="deposit-page">
            <div className="grid-content">
                <HelpContent path={"components/Deposit"} />
            </div>

            <div className="grid-block align-center">
                <div className="center-container">
                    <Switch>
                        <Route path={`${path}`} exact>
                            <Deposits />
                        </Route>
                        <Route path={`${path}/redeem`} exact>
                            <Redeem />
                        </Route>
                        <Route path={`${path}/new`} exact>
                            <Selector />
                        </Route>
                        <Route path={`${path}/new/send_tx_hash`} exact>
                            <SendTxHashWrapped />
                        </Route>
                        <Route path={`${path}/new/:type`} exact>
                            <Method />
                        </Route>
                        <Route path={`${path}/:sessionId`} exact>
                            <Session />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}
