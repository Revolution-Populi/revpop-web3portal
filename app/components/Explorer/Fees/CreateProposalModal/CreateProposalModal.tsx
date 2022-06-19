import React, {useContext, useState} from "react";
import counterpart from "counterpart";
// @ts-ignore
import {Modal} from "bitshares-ui-style-guide";
import moment, {Moment} from "moment";
import ExpirationDate from "../../../Common/ExpirationDate";
import Context from "../Context";
import {GetChanged, getChangedHandler} from "../../../../Context/Fees";
import ChangedOperations from "./ChangedOperations";

interface Props {
    isVisible: boolean;
    close: () => void;
}

export default function CreateProposalModal({isVisible, close}: Props) {
    const [expirationDate, setExpirationDate] = useState(
        moment().add(1, "days")
    );
    const {operations} = useContext(Context);

    function onClose() {
        close();
    }

    async function save() {
        console.log(expirationDate);
    }

    function onDateChange(date: Moment) {
        setExpirationDate(date);
    }

    const getChanged = new GetChanged(operations);
    const changedOperations = getChangedHandler.execute(getChanged);

    if (changedOperations.isFailure()) {
        return null;
    }

    return (
        <Modal
            title={counterpart.translate("fees.create_proposal.modal_title")}
            className="create-proposal-modal-fees"
            width={1000}
            visible={isVisible}
            onOk={save}
            onCancel={onClose}
        >
            <ChangedOperations changedOperations={changedOperations.value} />
            <ExpirationDate onChange={onDateChange} />
        </Modal>
    );
}
