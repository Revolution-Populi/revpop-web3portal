export interface EESSettings {
    depositContractAddress: string;
    receiverAddress: string;
    minimumValue: string;
    minimumTimeLock: number;
    rvpWithdrawalFee: number;
    rvethWithdrawalFee: number;
    revpopCurrency: string;
    eesAccountName: string;
    withdrawTimeLock: number;
    withdrawContractAddress: string;
}

export default interface RepositoryInterface {
    loadEESSettings: () => Promise<EESSettings>;
    createDepositRequest: (
        internalAccount: string,
        hashLock: string
    ) => Promise<string>;
    createWithdrawRequest: (
        internalAccount: string,
        amountToPayInRVETH: number,
        addressOfUserInEthereum: string,
        withdrawalFeeAmount: number,
        withdrawalFeeCurrency: string
    ) => Promise<string>;
}
