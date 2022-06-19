export class AppError extends Error {
    public constructor(private _error: unknown) {
        super();
    }

    get error(): unknown {
        return this._error;
    }

    get message(): string {
        return "An unexpected error occurred.";
    }

    public static create(err: Error): AppError {
        return new AppError(err);
    }
}
