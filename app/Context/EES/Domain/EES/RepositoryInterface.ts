export interface EESSettings {
    contractAddress: string;
    receiverAddress: string;
    minimumValue: string;
    minimumTimeLock: number;
    rvpWithdrawalFee: number;
    rvethWithdrawalFee: number;
    revpopCurrency: string;
    eesAccountName: string;
    withdrawTimeLock: number;
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
        hashLock: string
    ) => Promise<string>;
}
