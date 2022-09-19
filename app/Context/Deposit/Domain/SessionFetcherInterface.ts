import Session from "./Session";

export default interface SessionFetcherInterface {
    fetch: () => Session;
}
