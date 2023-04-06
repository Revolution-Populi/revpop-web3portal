export interface WithdrawSettings {
    withdrawalFee: number;
    minimumWithdrawalAmount: number;
    feeAccount: string;
    withdrawalTimeLock: number;
}

export default interface RepositoryInterface {
    loadWithdrawSettings: () => Promise<WithdrawSettings>;
    createWithdrawRequest: (
        internalAccount: string,
        hashLock: string
    ) => Promise<string>;
}
