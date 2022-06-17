import React, {useContext, useState} from "react";
import counterpart from "counterpart";
// @ts-ignore
import {Modal} from "bitshares-ui-style-guide";
import moment, {Moment} from "moment";
import ExpirationDate from "../../../Common/ExpirationDate";
import Context from "../Context";
import {Fees} from "../../../../Context/Fees/types";
import OperationsType = Fees.OperationsType;
import {GetChanged, getChangedHandler} from "../../../../Context/Fees";

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
        // const handler = new CreateHandler(blockchainRepository);
        // const command = new Create(parameters, expirationDate);
        // const result = await handler.execute(command);
        //
        // if (result.isSuccess()) {
        //     close();
        //     onProposalCreated();
        // }
    }

    function onDateChange(date: Moment) {
        setExpirationDate(date);
    }

    // function getChangedFees(): OperationsType {
    //     const getChanged = new GetChanged(operations);
    //     return getChangedHandler.execute(getChanged);
    // }
    //
    // const changedFees = getChangedFees();

    return (
        <Modal
            title={counterpart.translate("fees.create_proposal.modal_title")}
            className="create-proposal-modal"
            visible={isVisible}
            onOk={save}
            onCancel={onClose}
        >
            <ExpirationDate onChange={onDateChange} />
        </Modal>
    );
}
