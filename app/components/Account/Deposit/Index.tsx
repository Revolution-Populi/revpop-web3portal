import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import HelpContent from "../../Utility/HelpContent";
import Deposits from "./List/Index";
import Selector from "./Methods/Selector";
import Method from "./Methods/Index";
import Redeem from "./Redeem/Index";
import SendTxHashWrapped from "./Methods/Manually/SendTxHash";

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
                    <Route path={`${path}/redeem`} exact>
                        <div className="grid-block align-center">
                            <div className="deposit-form">
                                <Redeem />
                            </div>
                        </div>
                    </Route>
                    <Route path={`${path}/new`} exact>
                        <div className="grid-block align-center">
                            <div className="deposit-form">
                                <Selector />
                            </div>
                        </div>
                    </Route>
                    <Route path={`${path}/new/send_tx_hash`} exact>
                        <div className="grid-block align-center">
                            <div className="deposit-form">
                                <SendTxHashWrapped />
                            </div>
                        </div>
                    </Route>
                    <Route path={`${path}/new/:type`} exact>
                        <div className="grid-block align-center">
                            <div className="deposit-form">
                                <Method />
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}
