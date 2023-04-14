import Contract from "./Contract";

export default interface InternalBlockchainRepositoryInterface {
    loadContractsByAccount: (account: string) => Promise<Contract[]>;
}
