export default interface TokenDistributionRepositoryInterface {
    createTokenDistributionRequest: (
        accountName: string,
        phrase: string,
        publicKey: string
    ) => Promise<string>;
}
