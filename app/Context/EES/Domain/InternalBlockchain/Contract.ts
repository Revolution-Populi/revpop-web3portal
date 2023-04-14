export default class Contract {
    constructor(
        private readonly _id: string,
        private readonly _message: string
    ) {}

    get id(): string {
        return this._id;
    }

    get message(): string {
        return this._message;
    }
}
