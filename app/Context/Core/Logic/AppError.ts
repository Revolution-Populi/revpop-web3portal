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

export class BlockchainConnectionError extends AppError {
    public constructor() {
        super("Blockchain connection error.");
    }
}

export class EesConnectionError extends AppError {
    public constructor() {
        super("EES services is unavailable.");
    }
}
