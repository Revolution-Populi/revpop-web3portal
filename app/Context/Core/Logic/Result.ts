import {AppError} from "./AppError";
import {UseCaseError} from "./UseCaseError";

export type Result<F, S> = Failure<F> | Success<S>;

export type Either<F, S> = Failure<F> | Success<S>;

export class Success<T> {
    private readonly _value: T;

    constructor(value: T) {
        this._value = value;
    }

    get value(): T {
        return this._value;
    }

    isFailure(): this is Failure<T> {
        return false;
    }

    isSuccess(): this is Success<T> {
        return true;
    }

    public static create<T>(value: T) {
        return new Success<T>(value);
    }
}

export class Failure<T> {
    private readonly _error: AppError | UseCaseError;

    constructor(value: AppError | UseCaseError) {
        this._error = value;
    }

    get error(): AppError | UseCaseError {
        return this._error;
    }

    isFailure(): this is Failure<T> {
        return true;
    }

    isSuccess(): this is Success<T> {
        return false;
    }

    public static create<T>(error: AppError | UseCaseError) {
        return new Failure<T>(error);
    }
}
