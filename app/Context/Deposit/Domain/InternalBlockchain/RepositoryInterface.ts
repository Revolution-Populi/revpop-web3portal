import Htlc from "./Contract";

export default interface InternalContractRepositoryInterface {
    loadAccountHtlc: (account: string) => Promise<Htlc[]>;
}
