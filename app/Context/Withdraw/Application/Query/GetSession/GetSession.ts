export default class GetSession {
    constructor(private _sessionId: string) {}

    get sessionId(): string {
        return this._sessionId;
    }
}
