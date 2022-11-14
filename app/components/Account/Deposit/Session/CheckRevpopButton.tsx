import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import counterpart from "counterpart";
// @ts-ignore
import AccountStore from "stores/AccountStore";
// @ts-ignore
import {connect} from "alt-react";
import {
    checkBlockchainContract,
    CheckBlockchainContract
} from "../../../../Context/Deposit";

type Params = {
    sessionId: string;
    currentAccount: string;
};

function CheckRevpopButton({sessionId, currentAccount}: Params) {
    async function onClick() {
        const query = new CheckBlockchainContract(currentAccount, sessionId);
        const sessionsOrError = await checkBlockchainContract.execute(query);

        // console.log(sessionsOrError);
        console.log(currentAccount);
    }

    return (
        <a onClick={onClick}>
            {counterpart.translate("deposit.session.check_revpop_contract")}
        </a>
    );
}

export default connect(CheckRevpopButton, {
    listenTo() {
        return [AccountStore];
    },
    getProps() {
        return {
            currentAccount: AccountStore.getState().currentAccount
        };
    }
});
