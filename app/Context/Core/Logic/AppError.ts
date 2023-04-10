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

export class BlockchainConnectionError extends Error {
    public constructor() {
        super("Blockchain connection error.");
    }
}

export class EesConnectionError extends Error {
    public constructor() {
        super("EES services is unavailable.");
    }
}

export class UseCaseError extends Error {
    public constructor(message: string) {
        super(message);
    }
}
