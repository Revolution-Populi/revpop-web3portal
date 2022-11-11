import React from "react";
import PropTypes from "prop-types";
import AssetActions from "actions/AssetActions";
import SettingsActions from "actions/SettingsActions";
import {Link} from "react-router-dom";
import Immutable from "immutable";
import Translate from "react-translate-component";
import LinkToAccountById from "../Utility/LinkToAccountById";
import assetUtils from "common/asset_utils";
import FormattedAsset from "../Utility/FormattedAsset";
import AssetName from "../Utility/AssetName";
import {ChainStore} from "@revolutionpopuli/revpopjs";
import utils from "common/utils";
import ls from "common/localStorage";
import {Apis} from "@revolutionpopuli/revpopjs-ws";
import {Table, Select, Icon} from "bitshares-ui-style-guide";
import SearchInput from "../Utility/SearchInput";

let accountStorage = ls("__graphene__");

class Assets extends React.Component {
    constructor(props) {
        super();

        let chainID = Apis.instance().chain_id;
        if (chainID) chainID = chainID.substr(0, 8);
        else chainID = "4018d784";

        this.state = {
            chainID,
            foundLast: false,
            lastAsset: "",
            isLoading: false,
            totalAssets:
                typeof accountStorage.get(`totalAssets_${chainID}`) != "object"
                    ? accountStorage.get(`totalAssets_${chainID}`)
                    : chainID && chainID === "4018d784"
                    ? 3000
                    : 50, // mainnet has 3000+ assets, other chains may not have that many
            assetsFetched: 0,
            filterSearch: props.filterSearch || "",
            rowsOnPage: "25"
        };

        this.handleRowsChange = this.handleRowsChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !Immutable.is(nextProps.assets, this.props.assets) ||
            !utils.are_equal_shallow(nextState, this.state)
        );
    }

    UNSAFE_componentWillMount() {
        this._checkAssets(this.props.assets, true);
    }

    handleFilterChange(e) {
        this.setState({
            filterSearch: (e.target.value || "").toUpperCase()
        });
    }

    handleRowsChange(rows) {
        this.setState({
            rowsOnPage: rows
        });
    }

    _checkAssets(assets, force) {
        this.setState({isLoading: true});
        let lastAsset = assets
            .sort((a, b) => {
                if (a.symbol > b.symbol) {
                    return 1;
                } else if (a.symbol < b.symbol) {
                    return -1;
                } else {
                    return 0;
                }
            })
            .last();

        if (assets.size === 0 || force) {
            AssetActions.getAssetList.defer("A", 100);
            this.setState({assetsFetched: 100});
        } else if (assets.size >= this.state.assetsFetched) {
            AssetActions.getAssetList.defer(lastAsset.symbol, 100);
            this.setState({assetsFetched: this.state.assetsFetched + 99});
        }

        if (assets.size > this.state.totalAssets) {
            accountStorage.set(
                `totalAssets_${this.state.chainID}`,
                assets.size
            );
        }

        if (this.state.assetsFetched >= this.state.totalAssets - 100) {
            this.setState({isLoading: false});
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.assets !== this.props.assets) {
            this._checkAssets(nextProps.assets);
        }
    }

    linkToAccount(name_or_id) {
        if (!name_or_id) {
            return <span>-</span>;
        }

        return <LinkToAccountById account={name_or_id} />;
    }

    _onFilter(type, e) {
        this.setState({[type]: e.target.value.toUpperCase()});
        SettingsActions.changeViewSetting({
            [type]: e.target.value.toUpperCase()
        });
    }

    render() {
        let {assets} = this.props;

        let coreAsset = ChainStore.getAsset("1.3.0");

        let dataSource = [];
        let columns = [];

        // Default sorting of the ant table is defined through defaultSortOrder prop

        columns = [
            {
                key: "symbol",
                title: "symbol",
                dataIndex: "symbol",
                defaultSortOrder: "ascend",
                sorter: (a, b) => {
                    return a.symbol > b.symbol
                        ? 1
                        : a.symbol < b.symbol
                        ? -1
                        : 0;
                },
                render: item => {
                    return (
                        <Link to={`/asset/${item}`}>
                            <AssetName name={item} />
                        </Link>
                    );
                }
            },
            {
                key: "issuer",
                title: "issuer",
                dataIndex: "issuer",
                sorter: (a, b) => {
                    let issuerA = ChainStore.getAccount(a.issuer, false);
                    let issuerB = ChainStore.getAccount(b.issuer, false);
                    if (issuerA) issuerA = issuerA.get("name");
                    if (issuerB) issuerB = issuerB.get("name");
                    if (issuerA > issuerB) return 1;
                    if (issuerA < issuerB) return -1;
                    return 0;
                },
                render: item => {
                    return this.linkToAccount(item);
                }
            },
            {
                key: "currentSupply",
                title: "Supply",
                dataIndex: "currentSupply",
                sorter: (a, b) => {
                    a.currentSupply = parseFloat(a.currentSupply);
                    b.currentSupply = parseFloat(b.currentSupply);
                    return a.currentSupply > b.currentSupply
                        ? 1
                        : a.currentSupply < b.currentSupply
                        ? -1
                        : 0;
                },
                render: (item, record) => {
                    return (
                        <FormattedAsset
                            amount={record.currentSupply}
                            asset={record.assetId}
                            hide_asset={true}
                        />
                    );
                }
            },
            {
                key: "marketId",
                title: "",
                dataIndex: "marketId",
                render: item => {
                    return (
                        <Link to={`/market/${item}`}>
                            <Icon type={"line-chart"} />{" "}
                            <Translate content="header.exchange" />
                        </Link>
                    );
                }
            }
        ];

        assets
            .filter(a => {
                return (
                    !a.market_asset &&
                    a.symbol.indexOf(this.state.filterSearch) !== -1
                );
            })
            .map(asset => {
                let description = assetUtils.parseDescription(
                    asset.options.description
                );

                let marketID =
                    asset.symbol +
                    "_" +
                    (description.market
                        ? description.market
                        : coreAsset
                        ? coreAsset.get("symbol")
                        : "RVP");

                dataSource.push({
                    symbol: asset.symbol,
                    issuer: asset.issuer,
                    currentSupply: asset.dynamic.current_supply,
                    assetId: asset.id,
                    marketId: marketID
                });
            });

        return (
            <div className="grid-block vertical">
                <div className="grid-block vertical">
                    <div className="grid-block main-content small-12 medium-10 medium-offset-1 main-content vertical">
                        <div className="text-center explore-testnet-warning">
                            <Translate
                                component="span"
                                content="explorer.asset.testnet_warning"
                            />
                        </div>
                        <div className="generic-bordered-box">
                            <div
                                style={{
                                    textAlign: "left",
                                    marginBottom: "24px"
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "0px",
                                        marginTop: "2px",
                                        float: "left",
                                        fontSize: "18px"
                                    }}
                                >
                                    {this.state.isLoading ? (
                                        <Icon type="loading" />
                                    ) : null}
                                </span>
                                <SearchInput
                                    value={this.state.filterSearch}
                                    style={{width: "200px"}}
                                    onChange={this.handleFilterChange}
                                />

                                <Select
                                    style={{width: "150px", marginLeft: "24px"}}
                                    value={this.state.rowsOnPage}
                                    onChange={this.handleRowsChange}
                                >
                                    <Select.Option key={"10"}>
                                        10 rows
                                    </Select.Option>
                                    <Select.Option key={"25"}>
                                        25 rows
                                    </Select.Option>
                                    <Select.Option key={"50"}>
                                        50 rows
                                    </Select.Option>
                                    <Select.Option key={"100"}>
                                        100 rows
                                    </Select.Option>
                                    <Select.Option key={"200"}>
                                        200 rows
                                    </Select.Option>
                                </Select>
                            </div>

                            <Table
                                style={{width: "100%", marginTop: "16px"}}
                                rowKey="symbol"
                                columns={columns}
                                dataSource={dataSource}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Assets.defaultProps = {
    assets: {}
};

Assets.propTypes = {
    assets: PropTypes.object.isRequired
};

export default Assets;
