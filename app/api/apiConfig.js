import {getFaucet, getTestFaucet} from "../branding";

export const ioxbankAPIs = {
    BASE: "https://api.ioxbank.com/bitshares",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    NEW_DEPOSIT_ADDRESS: "/simple-api/initiate-trade"
};

export const blockTradesAPIs = {
    BASE: "https://api.blocktrades.us/v2",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount"
};

export const openledgerAPIs = {
    BASE: "https://ol-api1.openledger.info/api/v0/ol/support",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount",
    RPC_URL: "https://openledger.info/api/"
};

export const rudexAPIs = {
    BASE: "https://gateway.rudex.org/api/rudex",
    COINS_LIST: "/coins",
    NEW_DEPOSIT_ADDRESS: "/simple-api/initiate-trade"
};

export const bitsparkAPIs = {
    BASE: "https://dex-api.bitspark.io/api/v1",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount"
};

export const cryptoBridgeAPIs = {
    BASE: "https://api.crypto-bridge.org/api/v1",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/wallets",
    MARKETS: "/markets",
    TRADING_PAIRS: "/trading-pairs"
};

export const citadelAPIs = {
    BASE: "https://citadel.li/trade",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs",
    DEPOSIT_LIMIT: "/deposit-limits",
    ESTIMATE_OUTPUT: "/estimate-output-amount",
    ESTIMATE_INPUT: "/estimate-input-amount"
};

export const gdex2APIs = {
    BASE: "https://api.52bts.net/adjust",
    COINS_LIST: "/coins",
    ACTIVE_WALLETS: "/active-wallets",
    TRADING_PAIRS: "/trading-pairs"
};

// Legacy Deposit/Withdraw
export const gdexAPIs = {
    BASE: "https://api.52bts.net",
    ASSET_LIST: "/gateway/asset/assetList",
    ASSET_DETAIL: "/gateway/asset/assetDetail",
    GET_DEPOSIT_ADDRESS: "/gateway/address/getAddress",
    CHECK_WITHDRAY_ADDRESS: "/gateway/address/checkAddress",
    DEPOSIT_RECORD_LIST: "/gateway/deposit/recordList",
    DEPOSIT_RECORD_DETAIL: "/gateway/deposit/recordDetail",
    WITHDRAW_RECORD_LIST: "/gateway/withdraw/recordList",
    WITHDRAW_RECORD_DETAIL: "/gateway/withdraw/recordDetail",
    GET_USER_INFO: "/gateway/user/getUserInfo",
    USER_AGREEMENT: "/gateway/user/isAgree",
    WITHDRAW_RULE: "/gateway/withdraw/rule"
};

export const xbtsxAPIs = {
    BASE: "https://apis.xbts.io/api/v1",
    COINS_LIST: "/coin"
};

export const nodeRegions = [
    // region of the node follows roughly https://en.wikipedia.org/wiki/Subregion#/media/File:United_Nations_geographical_subregions.png
    "Northern Europe",
    "Western Europe",
    "Southern Europe",
    "Eastern Europe",
    "Northern Asia",
    "Western Asia",
    "Southern Asia",
    "Eastern Asia",
    "Central Asia",
    "Southeastern Asia",
    "Australia and New Zealand",
    "Melanesia",
    "Polynesia",
    "Micronesia",
    "Northern Africa",
    "Western Africa",
    "Middle Africa",
    "Eastern Africa",
    "Southern Africa",
    "Northern America",
    "Central America",
    "Caribbean",
    "South America"
];

export const settingsAPIs = {
    // If you want a location to be translated, add the translation to settings in locale-xx.js
    // and use an object {translate: key} in WS_NODE_LIST
    DEFAULT_WS_NODE: "wss://testnet1.revolutionpopuli.com:8090",
    WS_NODE_LIST: [
        {
            url: "wss://testnet1.revolutionpopuli.com:8090",
            location: "Revolution Populi Testnet",
            region: "Northern America",
            country: "USA"
        },
        {
            url: "wss://testnet2.revolutionpopuli.com:8090",
            location: "Revolution Populi Testnet node 2",
            region: "Northern America",
            country: "USA"
        },
        {
            url: "wss://testnet3.revolutionpopuli.com:8090",
            location: "Revolution Populi Testnet node 3",
            region: "Western Europe",
            country: "Germany"
        },
        {
            url: "wss://testnet4.revolutionpopuli.com:8090",
            location: "Revolution Populi Testnet node 4",
            region: "Northwestern Europe",
            country: "Netherlands"
        },
        {
            url: "ws://localhost:8090",
            location: "Locally hosted"
        }
    ],
    ES_WRAPPER_LIST: [],
    DEFAULT_FAUCET: getFaucet().url,
    TESTNET_FAUCET: getTestFaucet().url
};

export const EesAPI = {
    BASE: "http://localhost:3000",
    DEPOSIT_SETTINGS: "/deposit/settings",
    SUBMIT_DEPOSIT_REQUEST: "/deposit",
    CHECK_DEPOSIT_SUBMITTED_TO_INTERNAL_BLOCKCHAIN: "/deposit/submitted"
};
