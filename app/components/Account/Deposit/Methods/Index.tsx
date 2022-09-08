import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Metamask from "./Metamask/Index";
import Manually from "./Manually/Index";
import Page404 from "../../../Page404/Page404";
import {GetSessionId, getSessionIdHandler} from "../../../../Context/Deposit";

type SelectorParams = {
    type: string;
};

export default function Index() {
    const {type} = useParams<SelectorParams>();

    useEffect(() => {
        const query = new GetSessionId();
        const sessionId = getSessionIdHandler.execute(query);
        console.log(sessionId);
    }, []);

    switch (type) {
        case "metamask":
            return (
                <div className="deposit-form">
                    <Metamask />
                </div>
            );
        case "manually":
            return <Manually />;
        default:
            return <Page404 />;
    }
}
