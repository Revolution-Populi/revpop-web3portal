import React, {Component} from "react";
import Showcase from "./Showcase";
import {connect} from "alt-react";
import {ChainStore} from "@revolutionpopuli/revpopjs";
import AccountStore from "../../stores/AccountStore";
import {createPaperWalletAsPDF} from "common/paperWallet";

class ShowcaseGrid extends Component {
    constructor() {
        super();
        this.state = {currentAccount: null};
    }

    UNSAFE_componentWillMount() {
        this.setState({
            currentAccount: ChainStore.getAccount(this.props.currentAccount)
        });
    }

    UNSAFE_componentWillReceiveProps(np) {
        if (np.currentAccount !== this.props.currentAccount) {
            this.setState({
                currentAccount: ChainStore.getAccount(np.currentAccount)
            });
        }
    }

    render() {
        let hasAccount = this.state.currentAccount !== null;

        let thiz = this;
        const tiles = [
            {
                title: "showcases.personal_data.title",
                target: () => {
                    if (hasAccount) {
                        thiz.props.history.push("/spotlight/personal");
                    }
                },
                description: "showcases.personal_data.description",
                icon: "user", // see Icons app/compoentns/Icon/Icon
                disabled: hasAccount
                    ? false
                    : "Please login to use this functionality"
            },
            {
                title: "showcases.voting.title",
                target: event => {
                    if (hasAccount) {
                        thiz.props.history.push(
                            "/account/" +
                                this.state.currentAccount.get("name") +
                                "/voting"
                        );
                    }
                },
                description: "showcases.voting.description",
                icon: "voting",
                disabled: hasAccount
                    ? false
                    : "Please login to use this functionality"
            }
            // .... even more tiles in this list
        ];
        return (
            <div
                className="overflow-visible showcases-grid"
                style={{
                    align: "center"
                }}
            >
                <div className="showcases-grid--wrapper">
                    {tiles.map(tile => {
                        return (
                            <div
                                key={tile.title}
                                className="showcases-grid--wrapper--item"
                            >
                                {!!tile.disabled ? (
                                    <Showcase
                                        target={tile.target}
                                        title={tile.title}
                                        description={tile.description}
                                        icon={tile.icon}
                                        disabled={tile.disabled}
                                        comingSoon={tile.comingSoon || false}
                                    />
                                ) : (
                                    <Showcase
                                        target={tile.target}
                                        title={tile.title}
                                        description={tile.description}
                                        icon={tile.icon}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

ShowcaseGrid = connect(ShowcaseGrid, {
    listenTo() {
        return [AccountStore];
    },
    getProps() {
        return {
            currentAccount:
                AccountStore.getState().currentAccount ||
                AccountStore.getState().passwordAccount
        };
    }
});

export default ShowcaseGrid;
