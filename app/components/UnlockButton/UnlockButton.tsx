import React from "react";
import WalletUnlockActions from "../../actions/WalletUnlockActions";
import AccountActions from "../../actions/AccountActions";
// @ts-ignore
import Translate from "react-translate-component";
import WalletUnlockStore from "../../stores/WalletUnlockStore";
// @ts-ignore
import {connect} from "alt-react";

type Params = {
    walletLocked: boolean;
    children: JSX.Element;
};

function UnlockButton({walletLocked, children}: Params) {
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
                <Translate content="form.actions.check_unlock_account" />
            </a>
        );
    }

    return children;
}

export default connect(UnlockButton, {
    listenTo() {
        return [WalletUnlockStore];
    },
    getProps() {
        return {
            walletLocked: WalletUnlockStore.getState().locked
        };
    }
});
