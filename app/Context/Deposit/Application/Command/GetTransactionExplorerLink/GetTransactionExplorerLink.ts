import Session from "../../../Domain/Session";

export default class GetTransactionExplorerLink {
    constructor(private _session: Session) {}

    get session(): Session {
        return this._session;
    }
}
