import React from "react";
import Icon from "../Icon/Icon";
import Translate from "react-translate-component";
import cnames from "classnames";
import AccountActions from "actions/AccountActions";

export default class DropDownMenu extends React.Component {
    shouldComponentUpdate(np) {
        let shouldUpdate = false;
        for (let key in np) {
            if (typeof np[key] === "function") continue;
            shouldUpdate = shouldUpdate || np[key] !== this.props[key];
        }
        return shouldUpdate;
    }

    _onAddContact() {
        AccountActions.addAccountContact(this.props.currentAccount);
    }

    _onRemoveContact() {
        AccountActions.removeAccountContact(this.props.currentAccount);
    }

    render() {
        const {
            dropdownActive,
            toggleLock,
            maxHeight,
            locked,
            active,
            passwordLogin,
            isMyAccount,
            showAccountLinks,
            tradeUrl,
            enableDepositWithdraw,
            currentAccount,
            contacts
        } = this.props;

        let isContact = contacts.has(currentAccount);

        return (
            <ul
                className="dropdown header-menu"
                style={{
                    left: -200,
                    top: 64,
                    maxHeight: !dropdownActive ? 0 : maxHeight,
                    overflowY: "auto"
                }}
            >
                <li className="divider" onClick={toggleLock}>
                    <div className="table-cell">
                        <Icon size="2x" name="power" title="icons.power" />
                    </div>
                    <div className="table-cell">
                        <Translate
                            content={`header.${
                                this.props.locked
                                    ? "unlock_short"
                                    : "lock_short"
                            }`}
                        />
                    </div>
                </li>

                {locked ? (
                    <li
                        className={cnames({
                            active:
                                active.indexOf(
                                    `/create-account/${
                                        !passwordLogin ? "wallet" : "password"
                                    }`
                                ) !== -1
                        })}
                        onClick={this.props.onNavigate.bind(
                            this,
                            `/create-account/${
                                !passwordLogin ? "wallet" : "password"
                            }`
                        )}
                    >
                        <div className="table-cell">
                            <Icon
                                size="2x"
                                name="user"
                                title="icons.user.create_account"
                            />
                        </div>
                        <div className="table-cell">
                            <Translate content="header.create_account" />
                        </div>
                    </li>
                ) : null}

                {!this.props.locked ? (
                    <li
                        className={cnames({
                            active: active.indexOf("/account") !== -1
                        })}
                        onClick={this.props.onNavigate.bind(
                            this,
                            `/account/${currentAccount}`
                        )}
                    >
                        <div className="table-cell">
                            <Icon
                                size="2x"
                                name="dashboard"
                                title="icons.dasboard"
                            />
                        </div>
                        <div className="table-cell">
                            <Translate content="header.dashboard" />
                        </div>
                    </li>
                ) : null}

                <li
                    className={cnames(
                        {
                            active: active.indexOf("/explorer") !== -1
                        },
                        "column-show-small"
                    )}
                    onClick={this.props.onNavigate.bind(
                        this,
                        "/explorer/blocks"
                    )}
                >
                    <div className="table-cell">
                        <Icon size="2x" name="server" title="icons.server" />
                    </div>
                    <div className="table-cell">
                        <Translate content="header.explorer" />
                    </div>
                </li>

                {[
                    {
                        icon: {
                            name: "transfer",
                            title: "icons.transfer"
                        },
                        disabled: !showAccountLinks,
                        mainText: "header.payments",
                        mainCallback: this.props.showSend,
                        subText: "header.payments_legacy",
                        subURL: "/transfer"
                    }
                ].map(
                    (
                        {
                            icon,
                            subURL,
                            disabled,
                            mainText,
                            subText,
                            mainCallback
                        },
                        index
                    ) => (
                        <li
                            key={index}
                            className={cnames({
                                active: active.indexOf(subURL) !== -1,
                                disabled
                            })}
                            onClick={
                                disabled
                                    ? event => {
                                          event.stopPropagation();
                                      }
                                    : mainCallback
                            }
                        >
                            <div className="table-cell">
                                <Icon size="2x" {...icon} />
                            </div>
                            <div className="table-cell">
                                <Translate content={mainText} />{" "}
                                <span
                                    onClick={
                                        disabled
                                            ? () => {}
                                            : event => {
                                                  event.stopPropagation();
                                                  this.props.onNavigate.bind(
                                                      this,
                                                      subURL
                                                  )(event);
                                              }
                                    }
                                    className={cnames(
                                        "header-dropdown-sub-link",
                                        {enabled: !disabled}
                                    )}
                                >
                                    <Translate content={subText} />
                                </span>
                            </div>
                        </li>
                    )
                )}

                <li
                    className={cnames(
                        {
                            active: active.indexOf("/settings") !== -1
                        },
                        "divider",
                        "desktop-only"
                    )}
                    onClick={this.props.onNavigate.bind(this, "/settings")}
                >
                    <div className="table-cell">
                        <Icon size="2x" name="cogs" title="icons.cogs" />
                    </div>
                    <div className="table-cell">
                        <Translate content="header.settings" />
                    </div>
                </li>

                <li
                    className={cnames({
                        active: active.indexOf("/spotlight") !== -1
                    })}
                    onClick={this.props.onNavigate.bind(this, "/spotlight")}
                >
                    <div className="table-cell">
                        <Icon
                            size="2x"
                            name="showcases"
                            title="icons.showcases"
                        />
                    </div>
                    <div className="table-cell">
                        <Translate content="header.showcases" />
                    </div>
                </li>

                <li
                    className={cnames(
                        {
                            active: active.indexOf("/settings") !== -1
                        },
                        "divider",
                        "mobile-only",
                        "has-submenu"
                    )}
                    onClick={this.props.toggleDropdownSubmenu}
                >
                    <div className="table-cell">
                        <Icon size="2x" name="cogs" title="icons.cogs" />
                    </div>
                    <div className="table-cell">
                        <Translate content="header.settings" />{" "}
                    </div>
                </li>

                <li
                    className={cnames(
                        {
                            active:
                                active.indexOf(
                                    "/help/introduction/bitshares"
                                ) !== -1
                        },
                        "divider"
                    )}
                    onClick={this.props.onNavigate.bind(
                        this,
                        "/help/introduction/bitshares"
                    )}
                >
                    <div className="table-cell">
                        <Icon
                            size="2x"
                            name="question-circle"
                            title="icons.question_circle"
                        />
                    </div>
                    <div className="table-cell">
                        <Translate content="header.help" />
                    </div>
                </li>

                <li
                    className={cnames({
                        active: active.indexOf("/voting") !== -1,
                        disabled: !showAccountLinks
                    })}
                    onClick={this.props.onNavigate.bind(
                        this,
                        `/account/${currentAccount}/voting`
                    )}
                >
                    <div className="table-cell">
                        <Icon
                            size="2x"
                            name="thumbs-up"
                            title="icons.thumbs_up"
                        />
                    </div>
                    <div className="table-cell">
                        <Translate content="account.voting" />
                    </div>
                </li>

                <li
                    className={cnames("divider", {
                        active: active.indexOf("/permissions") !== -1,
                        disabled: !showAccountLinks
                    })}
                    onClick={this.props.onNavigate.bind(
                        this,
                        `/account/${currentAccount}/permissions`
                    )}
                >
                    <div className="table-cell">
                        <Icon size="2x" name="warning" title="icons.warning" />
                    </div>
                    <div className="table-cell">
                        <Translate content="account.permissions" />
                    </div>
                </li>

                {showAccountLinks ? (
                    <li
                        className={cnames(
                            {
                                active: active.indexOf("/accounts") !== -1
                            },
                            "divider"
                        )}
                        onClick={this.props.onNavigate.bind(this, "/accounts")}
                    >
                        <div className="table-cell">
                            <Icon
                                size="2x"
                                name="folder"
                                title="icons.folder"
                            />
                        </div>
                        <div className="table-cell">
                            <Translate content="explorer.accounts.title" />
                        </div>
                    </li>
                ) : null}
            </ul>
        );
    }
}
