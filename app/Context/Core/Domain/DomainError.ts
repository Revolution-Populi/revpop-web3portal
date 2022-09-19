interface DomainErrorInterface {
    message: string;
}

export abstract class DomainError implements DomainErrorInterface {
    public readonly message: string;

    constructor(message: string) {
        this.message = message;
    }
}
