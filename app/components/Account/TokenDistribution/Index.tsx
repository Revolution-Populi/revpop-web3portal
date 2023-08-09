import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import HelpContent from "../../Utility/HelpContent";
import Form from "./Form/Index";
import CenterContainer from "./../CenterContainer";

export default function Index() {
    const {path} = useRouteMatch();

    return (
        <div className="withdraw-page">
            <div className="grid-content">
                <HelpContent path={"components/TokenDistribution"} />
            </div>

            <Switch>
                <Route path={`${path}/new`} exact>
                    <CenterContainer>
                        <Form />
                    </CenterContainer>
                </Route>
            </Switch>
        </div>
    );
}
