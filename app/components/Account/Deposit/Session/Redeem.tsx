import React, {useState} from "react";
// @ts-ignore
import Translate from "react-translate-component";
// @ts-ignore
import {Apis} from "@revolutionpopuli/revpopjs-ws";
// @ts-ignore
import {ChainStore, FetchChainObjects} from "@revolutionpopuli/revpopjs";
import {bindToCurrentAccount} from "../../../Utility/BindToCurrentAccount";
import SessionRepository from "../../../../Context/Deposit/Infrastructure/SessionRepository/IndexedDB";
import HtlcModal from "../../../Modal/HtlcModal";
import {Session} from "../../../../Context/Deposit";

type Params = {
    session: Session;
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

    async function afterSuccess() {
        session.redeemed();
        await sessionRepository.save(session);
        refresh();
    }

    async function onShowModalClick() {
        await FetchChainObjects(
            ChainStore.getAccount,
            [session.internalAccount],
            undefined,
            {}
        );
        await FetchChainObjects(
            ChainStore.getAccount,
            ["1.2.70"],
            undefined,
            {}
        );
        await FetchChainObjects(ChainStore.getAsset, ["1.3.1"]);

        const htlc = await Apis.instance()
            .db_api()
            .exec("get_htlc", [session.internalContract?.id]);

        setModalData({
            type: "redeem",
            payload: htlc
        });
        setIsModalVisible(true);
    }

    return (
        <div className="redeem">
            <a className="button" onClick={onShowModalClick}>
                <Translate content="showcases.htlc.redeem" />
            </a>

            {isModalVisible ? (
                <HtlcModal
                    isModalVisible={isModalVisible}
                    hideModal={hideModal}
                    operation={modalData}
                    fromAccount={currentAccount}
                    afterSuccess={afterSuccess}
                />
            ) : null}
        </div>
    );
}

export default bindToCurrentAccount(Redeem);
