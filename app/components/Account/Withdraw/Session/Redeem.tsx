import React, {useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";
// @ts-ignore
import {ChainStore, FetchChainObjects} from "@revolutionpopuli/revpopjs";
import {bindToCurrentAccount} from "../../../Utility/BindToCurrentAccount";
import SessionRepository from "../../../../Context/EES/Infrastructure/SessionRepository/IndexedDBDepositSessionRepository";
import RedeemForm from "../Form/Redeem/Index";
import {WithdrawSession} from "../../../../Context/EES";
import {
    Modal,
    Button
    // @ts-ignore
} from "bitshares-ui-style-guide";
import counterpart from "counterpart";

type Params = {
    session: WithdrawSession;
    currentAccount: any;
    refresh: () => void;
};

const sessionRepository = new SessionRepository();

function Redeem({session, currentAccount, refresh}: Params) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<any>();

    async function hideModal() {
        setIsModalVisible(false);
    }

    async function onShowModalClick() {
        setIsModalVisible(true);
    }

    return (
        <div className="redeem">
            <a className="button" onClick={onShowModalClick}>
                <Translate content="showcases.htlc.redeem" />
            </a>

            {isModalVisible ? (
                <RedeemForm
                    withdraw={session}
                    hideModal={hideModal}
                    isModalVisible={isModalVisible}
                />
            ) : null}
        </div>
    );
}

export default bindToCurrentAccount(Redeem);
