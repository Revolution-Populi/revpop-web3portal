import {Result} from "./Result";
import {UseCaseError} from "./UseCaseError";

export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: string) {
        super(false, {
            message: "An unexpected error occurred.",
            error: err
        } as UseCaseError);
        console.log("[AppError]: An unexpected error occurred");
        console.error(err);
    }

    public static create(err: string): UnexpectedError {
        return new UnexpectedError(err);
    }
}

export class EesConnectionError extends Result<UseCaseError> {
    public constructor(err?: string) {
        super(false, {
            message: "EES services is unavailable.",
            error: err
        } as UseCaseError);

        console.log("[EES connection error]: EES services is unavailable.");
        console.error(err);
    }

    public static create(err?: string): EesConnectionError {
        return new EesConnectionError(err);
    }
}
