export class UnexpectedError {
    public constructor(private _error: unknown) {}

    get error(): unknown {
        return this._error;
    }

    get message(): string {
        return "An unexpected error occurred.";
    }

    public static create(err: Error): UnexpectedError {
        return new UnexpectedError(err);
    }
}
