import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import HelpContent from "../../Utility/HelpContent";
import Sessions from "./List/Index";
import Form from "./Form/Index";
import Session from "./Session/Index";
import CenterContainer from "./../CenterContainer";

export default function Index() {
    const {path} = useRouteMatch();

    return (
        <div className="withdraw-page">
            <div className="grid-content">
                <HelpContent path={"components/Withdraw"} />
            </div>

            <Switch>
                <Route path={`${path}`} exact>
                    <Sessions />
                </Route>
                <Route path={`${path}/new`} exact>
                    <CenterContainer>
                        <Form />
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
