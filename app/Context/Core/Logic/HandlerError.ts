interface HandlerErrorInterface {
    message: string;
}

export abstract class HandlerError implements HandlerErrorInterface {
    public readonly message: string;

    constructor(message: string) {
        this.message = message;
    }
}
