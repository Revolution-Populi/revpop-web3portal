export interface EESSettings {
    contractAddress: string;
    receiverAddress: string;
    minimumValue: string;
    minimumTimeLock: number;
    rvpWithdrawalFee: number;
    rvethWithdrawalFee: number;
}

export default interface RepositoryInterface {
    loadEESSettings: () => Promise<EESSettings>;
    createDepositRequest: (
        internalAccount: string,
        hashLock: string
    ) => Promise<string>;
}
