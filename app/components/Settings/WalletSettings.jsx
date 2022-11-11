import React from "react";
import {ChangeActiveWallet, WalletDelete} from "../Wallet/WalletManager";
import BalanceClaimActive from "../Wallet/BalanceClaimActive";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import WalletDb from "stores/WalletDb";
import {Form, Button} from "bitshares-ui-style-guide";

const FormItem = Form.Item;

export default class WalletSettings extends React.Component {
    constructor() {
        super();

        this.state = {
            lookupActive: false,
            resetMessage: null
        };
    }

    onLookup() {
        this.setState({
            lookupActive: true
        });
    }

    onResetBrainkeySequence() {
        WalletDb.resetBrainKeySequence();
        this.setState({
            resetMessage: counterpart.translate("wallet.brainkey_reset_success")
        });
    }

    render() {
        let {lookupActive} = this.state;
        let {deprecated} = this.props;

        if (deprecated) {
            return (
                <div>
                    <ChangeActiveWallet />
                    <WalletDelete />
                </div>
            );
        }

        return (
            <div>
                <ChangeActiveWallet />
                <WalletDelete />

                <FormItem
                    label={counterpart.translate("wallet.brainkey_seq_reset")}
                    className="no-offset"
                    style={{padding: "15px 0"}}
                >
                    <div>
                        <p>
                            <Translate
                                unsafe
                                content="wallet.brainkey_seq_reset_text"
                            />
                        </p>
                        <Button
                            onClick={this.onResetBrainkeySequence.bind(this)}
                        >
                            <Translate content="wallet.brainkey_seq_reset_button" />
                        </Button>
                        {this.state.resetMessage ? (
                            <p
                                style={{paddingTop: 10}}
                                className="facolor-success"
                            >
                                {this.state.resetMessage}
                            </p>
                        ) : null}
                    </div>
                </FormItem>
            </div>
        );
    }
}
