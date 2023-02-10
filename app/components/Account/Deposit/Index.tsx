import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import HelpContent from "../../Utility/HelpContent";
import Deposits from "./List/Index";
import Form from "./Form/Index";
import ConfirmTransactionWrapped from "./Methods/Manually/ConfirmTransaction";
import Session from "./Session/Index";
import CenterContainer from "./CenterContainer";

export default function Index() {
    const {path} = useRouteMatch();

    return (
        <div className="deposit-page">
            <div className="grid-content">
                <HelpContent path={"components/Deposit"} />
            </div>

            <Switch>
                <Route path={`${path}`} exact>
                    <Deposits />
                </Route>
                <Route path={`${path}/new`} exact>
                    <CenterContainer>
                        <Form />
                    </CenterContainer>
                </Route>
                <Route path={`${path}/new/send_tx_hash`} exact>
                    <CenterContainer>
                        <ConfirmTransactionWrapped />
                    </CenterContainer>
                </Route>
                <Route path={`${path}/:sessionId`} exact>
                    <CenterContainer>
                        <Session />
                    </CenterContainer>
                </Route>
            </Switch>
        </div>
    );
}
