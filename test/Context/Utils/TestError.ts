interface TestErrorInterface {
    message: string;
}

export default class TestError implements TestErrorInterface {
    public readonly message: string;

    constructor(message = "Unexpected test error") {
        this.message = message;
    }
}
