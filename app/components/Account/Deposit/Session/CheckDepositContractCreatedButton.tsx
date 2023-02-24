import React from "react";
// @ts-ignore
import Translate from "react-translate-component";
import WalletUnlockStore from "../../../../stores/WalletUnlockStore";
// @ts-ignore
import {connect} from "alt-react";
import CheckDepositContractCreatedHandler from "../../../../Context/Deposit/Application/Command/CheckDepositContractCreated/CheckDepositContractCreatedHandler";
import CheckDepositContractCreated from "../../../../Context/Deposit/Application/Command/CheckDepositContractCreated/CheckDepositContractCreated";
// @ts-ignore
import {Notification} from "bitshares-ui-style-guide";
import counterpart from "counterpart";
import WalletUnlockActions from "../../../../actions/WalletUnlockActions";
import AccountActions from "../../../../actions/AccountActions";

type Params = {
    sessionId: string;
    walletLocked: boolean;
    refresh: () => void;
};

const handler = CheckDepositContractCreatedHandler.create();

function CheckDepositContractCreatedButton({
    sessionId,
    walletLocked,
    refresh
}: Params) {
    async function onClick() {
        const query = new CheckDepositContractCreated(sessionId);
        const result = await handler.execute(query);

        if (result) {
            refresh();
        } else {
            Notification.error({
                message: counterpart.translate(
                    "deposit.session.errors.contract_not_found"
                )
            });
        }
    }

    async function onClickUnlock(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        WalletUnlockActions.unlock()
            .then(() => {
                AccountActions.tryToSetCurrentAccount();
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch(() => {});
    }

    if (walletLocked) {
        return (
            <a className="button" onClick={onClickUnlock}>
                <Translate content="deposit.session.actions.check_deposit_contract_created_unlock" />
            </a>
        );
    }

    return (
        <a className="button" onClick={onClick}>
            <Translate content="deposit.session.actions.check_deposit_contract_created" />
        </a>
    );
}

export default connect(CheckDepositContractCreatedButton, {
    listenTo() {
        return [WalletUnlockStore];
    },
    getProps() {
        return {
            walletLocked: WalletUnlockStore.getState().locked
        };
    }
});
