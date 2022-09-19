export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error: T | null;
    private readonly _value: T | null;

    constructor(isSuccess: boolean, error: T | null, value: T | null = null) {
        if (isSuccess && error) {
            throw new Error("InvalidOperation: A result cannot be successful and contain an error");
        }

        if (!isSuccess && !error) {
            throw new Error("InvalidOperation: A failing result needs to contain an error message");
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;

        Object.freeze(this);
    }

    getValue(): T | null {
        if (!this.isSuccess) {
            return this.error as T;
        }

        return this._value;
    }

    static ok<U>(value: U | null = null): Result<U> {
        return new Result<U>(true, null, value);
    }

    static fail<U>(error: any): Result<U> {
        return new Result<U>(false, error);
    }

    static combine(results: Result<any>[]): Result<any> {
        for (const result of results) {
            if (result.isFailure) return result;
        }
        return Result.ok();
    }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
    readonly value: L;

    constructor(value: L) {
        this.value = value;
    }

    isLeft(): this is Left<L, A> {
        return true;
    }

    isRight(): this is Right<L, A> {
        return false;
    }
}

export class Right<L, A> {
    readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    isLeft(): this is Left<L, A> {
        return false;
    }

    isRight(): this is Right<L, A> {
        return true;
    }
}

export const left = <L, A>(l: L): Either<L, A> => {
    return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
    return new Right<L, A>(a);
};
