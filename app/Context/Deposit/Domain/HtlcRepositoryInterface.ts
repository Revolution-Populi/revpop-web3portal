import Htlc from "./Htlc";

export default interface HtlcRepositoryInterface {
    loadAccountHtlc: (account: string) => Promise<Htlc[]>;
}
