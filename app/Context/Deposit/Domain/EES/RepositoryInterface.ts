export interface DepositSettings {
    contractAddress: string;
    receiverAddress: string;
    minimumValue: string;
    minimumTimeLock: number;
}

export default interface RepositoryInterface {
    loadDepositSettings: () => Promise<DepositSettings>;
    createDepositRequest: (
        internalAccount: string,
        hashLock: string
    ) => Promise<string>;
}
