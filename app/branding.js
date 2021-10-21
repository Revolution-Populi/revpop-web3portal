import {Apis} from "@revolutionpopuli/revpopjs-ws";
/** This file centralized customization and branding efforts throughout the whole wallet and is meant to facilitate
 *  the process.
 *
 *  @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

/**
 * Determine if we are running on testnet or mainnet
 * @private
 */
function _isTestnet() {
    const testnet =
        "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447"; // just for the record
    const mainnet =
        "4018d7844c78f6a6c41c6a552b898022310fc5dec06da467ee7905a8dad512c8";

    // treat every other chain as testnet
    return Apis.instance().chain_id !== mainnet;
}

/**
 * Wallet name that is used throughout the UI and also in translations
 * @returns {string}
 */
export function getWalletName() {
    return "RevPop";
}

/**
 * URL of this wallet
 * @returns {string}
 */
export function getWalletURL() {
    return "https://revpop-blockchain.axioma.lv";
}

/**
 * Returns faucet information
 *
 * @returns {{url: string, show: boolean}}
 */
export function getFaucet() {
    return {
        url: "https://revpop-api.axioma.lv", // 2017-12-infrastructure worker proposal
        show: true,
        editable: false,
        referrer: "onboarding.bitshares.foundation"
    };
}

export function getTestFaucet() {
    // fixme should be solved by introducing _isTestnet into getFaucet and fixing the mess in the Settings when fetching faucet address
    return {
        url: "https://revpop-api.axioma.lv", // operated as a contribution by BitShares EU
        show: true,
        editable: false
    };
}

/**
 * Logo that is used throughout the UI
 * @returns {*}
 */
export function getLogo() {
    return require("assets/logo-ico-blue.png");
}

/**
 * Default set theme for the UI
 * @returns {string}
 */
export function getDefaultTheme() {
    // possible ["darkTheme", "lightTheme", "midnightTheme"]
    return "darkTheme";
}

/**
 * Default login method. Either "password" (for cloud login mode) or "wallet" (for local wallet mode)
 * @returns {string}
 */
export function getDefaultLogin() {
    // possible: one of "password", "wallet"
    return "password";
}

/**
 * Default units used by the UI
 *
 * @returns {[string,string,string,string,string,string]}
 */
export function getUnits() {
    if (_isTestnet()) {
        return ["RVP"];
    }
    return ["BTS", "USD", "CNY", "BTC", "EUR", "GBP"];
}

export function getDefaultMarket() {
    if (_isTestnet()) {
        return "WETH_RVP";
    }
    return "BTS_CNY";
}

/**
 * These are the highlighted bases in "My Markets" of the exchange
 *
 * @returns {[string]}
 */
export function getMyMarketsBases() {
    if (_isTestnet()) {
        return ["RVP"];
    }
    return ["BTS", "BTC", "CNY", "USD", "USDT", "ETH"];
}

/**
 * These are the default quotes that are shown after selecting a base
 *
 * @returns {[string]}
 */
export function getMyMarketsQuotes() {
    if (_isTestnet()) {
        return ["RVP"];
    }
    let tokens = {
        nativeTokens: [
            "BTC",
            "BTC1.0",
            "BTS",
            "CNY",
            "CNY1.0",
            "EUR",
            "EUR1.0",
            "GOLD",
            "GOLD1.0",
            "RUBLE",
            "RUB1.0",
            "SILVER",
            "SILVER1.0",
            "USD",
            "USD1.0"
        ],
        gdexTokens: [
            "GDEX.BTC",
            "GDEX.BTO",
            "GDEX.EOS",
            "GDEX.ETH",
            "GDEX.BKBT",
            "GDEX.GXC",
            "GDEX.SEER",
            "GDEX.FOTA",
            "GDEX.JRC",
            "GDEX.EOSDAC",
            "GDEX.MTS",
            "GDEX.GUSD",
            "GDEX.IQ",
            "GDEX.NULS",
            "GDEX.USDT"
        ],
        openledgerTokens: ["OBITS"],
        rudexTokens: [
            "PPY",
            "RUDEX.BTC",
            "RUDEX.ETH",
            "RUDEX.USDT",
            "RUDEX.EOS",
            "RUDEX.GOLOS",
            "RUDEX.GBG",
            "RUDEX.STEEM",
            "RUDEX.SBD",
            "RUDEX.KRM",
            "RUDEX.WLS",
            "RUDEX.SMOKE",
            "RUDEX.GRC",
            "RUDEX.PZM"
        ],
        xbtsxTokens: [
            "XBTSX.STH",
            "XBTSX.POST",
            "XBTSX.DOGE",
            "XBTSX.BTC",
            "XBTSX.BTG",
            "XBTSX.BCH",
            "XBTSX.LTC",
            "XBTSX.DASH",
            "XBTSX.NVC",
            "XBTSX.UNI",
            "XBTSX.NMC",
            "XBTSX.WAVES",
            "XBTSX.COF",
            "XBTSX.MDL",
            "XBTSX.ETH",
            "XBTSX.EXR",
            "XBTSX.USDT",
            "XBTSX.TUSD",
            "XBTSX.USDC",
            "XBTSX.USDN",
            "XBTSX.USD",
            "XBTSX.RUB",
            "XBTSX.EUR",
            "XBTSX.ATRI",
            "XBTSX.FIL",
            "XBTSX.EOS",
            "XBTSX.BAT"
        ],
        otherTokens: ["CVCOIN", "HERO", "OCT", "HERTZ", "YOYOW"]
    };

    let allTokens = [];
    for (let type in tokens) {
        allTokens = allTokens.concat(tokens[type]);
    }
    return allTokens;
}

/**
 * The featured markets displayed on the landing page of the UI
 *
 * @returns {list of string tuples}
 */
export function getFeaturedMarkets(quotes = []) {
    if (_isTestnet()) {
        return [["WETH", "RVP"]];
    }
    return [
        ["USD", "BTS"],
        ["USD", "GOLD"],
        ["USD", "HERO"],
        ["USD", "GDEX.BTC"],
        ["USD", "GDEX.ETH"],
        ["USD", "GDEX.EOS"],
        ["USD", "GDEX.BTO"],
        ["CNY", "BTS"],
        ["CNY", "USD"],
        ["CNY", "YOYOW"],
        ["CNY", "OCT"],
        ["CNY", "GDEX.BTC"],
        ["CNY", "GDEX.ETH"],
        ["CNY", "GDEX.EOS"],
        ["CNY", "GDEX.BTO"],
        ["CNY", "GDEX.SEER"],
        ["CNY", "GDEX.BKBT"],
        ["CNY", "GDEX.USDT"],
        ["CNY", "GDEX.GXC"],
        ["BTS", "RUBLE"],
        ["BTS", "HERO"],
        ["BTS", "OCT"],
        ["BTS", "SILVER"],
        ["BTS", "GOLD"],
        ["BTS", "GDEX.BTC"],
        ["BTS", "GDEX.ETH"],
        ["BTS", "GDEX.EOS"],
        ["BTS", "GDEX.BTO"],
        ["BTS", "GDEX.USDT"],
        ["BTS", "XBTSX.BTC"],
        ["BTS", "XBTSX.ETH"],
        ["BTS", "XBTSX.EUR"],
        ["BTS", "XBTSX.RUB"],
        ["BTS", "XBTSX.STH"],
        ["BTS", "XBTSX.TUSD"],
        ["BTS", "XBTSX.WAVES"],
        ["BTS", "XBTSX.USD"],
        ["BTS", "XBTSX.USDC"],
        ["BTS", "XBTSX.USDN"],
        ["BTS", "XBTSX.USDT"],
        ["BTS", "HERTZ"]
    ].filter(a => {
        if (!quotes.length) return true;
        return quotes.indexOf(a[0]) !== -1;
    });
}

/**
 * Recognized namespaces of assets
 *
 * @returns {[string,string,string,string,string,string,string]}
 */
export function getAssetNamespaces() {
    if (_isTestnet()) {
        return [];
    }
    return ["OPEN.", "RUDEX.", "GDEX.", "XBTSX.", "CITADEL."];
}

/**
 * These namespaces will be hidden to the user, this may include "bit" for BitAssets
 * @returns {[string,string]}
 */
export function getAssetHideNamespaces() {
    // e..g "OPEN.", "bit"
    return [];
}

/**
 * Allowed gateways that the user will be able to choose from in Deposit Withdraw modal
 * @param gateway
 * @returns {boolean}
 */
export function allowedGateway(gateway) {
    const allowedGateways = [
        "TRADE",
        "OPEN", // keep to display the warning icon, permanently disabled in gateways.js
        "RUDEX", // keep to display the warning icon, permanently disabled in gateways.js
        "GDEX",
        "XBTSX",
        "CITADEL",
        "BRIDGE", // keep to display the warning icon, permanently disabled in gateways.js
        "SPARKDEX" // keep to display the warning icon, permanently disabled in gateways.js
    ];
    if (!gateway) {
        // answers the question: are any allowed?
        return allowedGateways.length > 0;
    }
    return allowedGateways.indexOf(gateway) >= 0;
}

export function getSupportedLanguages() {
    // not yet supported
}

export function getAllowedLogins() {
    // possible: list containing any combination of ["password", "wallet"]
    return ["password", "wallet"];
}

export function getConfigurationAsset() {
    let assetSymbol = null;
    if (_isTestnet()) {
        assetSymbol = "NOTIFICATIONS";
    } else {
        assetSymbol = "TEST";
    }
    // explanation will be parsed out of the asset description (via split)
    return {
        symbol: assetSymbol,
        explanation:
            "This asset is used for decentralized configuration of the BitShares UI placed under bitshares.org."
    };
}

export function getSteemNewsTag() {
    return null;
}
