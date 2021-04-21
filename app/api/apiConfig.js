import {getFaucet} from "../branding";

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
    BASE: "https://gateway.rudex.org/api/v0_1",
    COINS_LIST: "/coins",
    NEW_DEPOSIT_ADDRESS: "/new-deposit-address"
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

// export const gdex2APIs = {
//     BASE: "https://api.gdex.io/adjust",
//     COINS_LIST: "/coins",
//     ACTIVE_WALLETS: "/active-wallets",
//     TRADING_PAIRS: "/trading-pairs"
// };

// Legacy Deposit/Withdraw
// export const gdexAPIs = {
//     BASE: "https://api.gdex.io",
//     ASSET_LIST: "/gateway/asset/assetList",
//     ASSET_DETAIL: "/gateway/asset/assetDetail",
//     GET_DEPOSIT_ADDRESS: "/gateway/address/getAddress",
//     CHECK_WITHDRAY_ADDRESS: "/gateway/address/checkAddress",
//     DEPOSIT_RECORD_LIST: "/gateway/deposit/recordList",
//     DEPOSIT_RECORD_DETAIL: "/gateway/deposit/recordDetail",
//     WITHDRAW_RECORD_LIST: "/gateway/withdraw/recordList",
//     WITHDRAW_RECORD_DETAIL: "/gateway/withdraw/recordDetail",
//     GET_USER_INFO: "/gateway/user/getUserInfo",
//     USER_AGREEMENT: "/gateway/user/isAgree",
//     WITHDRAW_RULE: "/gateway/withdraw/rule"
// };

export const xbtsxAPIs = {
    BASE: "https://apis.xbts.io/api/v1",
    COINS_LIST: "/coin"
};

// Currently IPFS node doesn't make blockchain related checks.
// These checks are simulated by the Basic Authentication.
// In the future, IPFS node will look into the blockchain to restrict unwanted uploads.
export const storageAPIs = {
    API_NODE_LIST: [
        {
            connection: {
                host: "ipfstest.revolutionpopuli.com",
                port: 443,
                protocol: "https",
                headers: {
                    authorization:
                        "Basic Z0pUUndOYkw5VWpTaHB2dDo2WmpBQmFzVVk5M0hxQks4"
                }
            }
        }
        // {
        //     connection: 'http://localhost:5001'
        // }
    ],
    // Not used now
    GATEWAY_NODE_LIST: [
        {
            connection: "https://ipfstest.revolutionpopuli.com:8080/"
        }
    ]
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
    "Australia",
    "New Zealand",
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
            country: "USA",
            location: "Oregon"
        },
        {
            url: "wss://testnet2.revolutionpopuli.com:8090",
            location: "Revolution Populi Testnet node 2",
            region: "Northern America",
            country: "USA",
            location: "Virginia"
        },
        {
            url: "wss://testnet3.revolutionpopuli.com:8090",
            location: "Revolution Populi Testnet node 3",
            region: "Western Europe",
            country: "Germany",
            location: "Frankfurt"
        },
        {
            url: "ws://localhost:8090",
            location: "Locally hosted"
        }
    ],
    DEFAULT_FAUCET: getFaucet().url,
    TESTNET_FAUCET: "https://testnet.revolutionpopuli.com"
};
