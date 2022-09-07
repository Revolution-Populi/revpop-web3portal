export interface Result<T> {
    isFailure: () => boolean;
    isSuccess: () => boolean;
}

export type Either<F, S> = Failure<F> | Success<S>;

export class Success<T> implements Result<T> {
    private readonly _value: T | undefined;

    constructor(value?: T) {
        this._value = value;
    }

    get value(): T | undefined {
        return this._value;
    }

    isFailure(): this is Failure<T> {
        return false;
    }

    isSuccess(): this is Success<T> {
        return true;
    }

    public static create<T>(value?: T) {
        return new Success<T>(value);
    }
}

export class Failure<T> implements Result<T> {
    private readonly _value: T;

    constructor(value: T) {
        this._value = value;
    }

    get value(): T {
        return this._value;
    }

    isFailure(): this is Failure<T> {
        return true;
    }

    isSuccess(): this is Success<T> {
        return false;
    }

    public static create<T>(value: T) {
        return new Failure<T>(value);
    }
}

// export const failure = <T>(error: T): Failure<T> => {
//     return new Failure<T>(error);
// };
//
// export const success = <T>(result?: T): Success<T> => {
//     return new Success<T>(result);
// };
