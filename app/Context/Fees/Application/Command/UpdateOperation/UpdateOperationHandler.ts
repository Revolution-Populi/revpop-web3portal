import UpdateOperation from "./UpdateOperation";

export default class UpdateOperationHandler {
    async execute(request: UpdateOperation) {
        console.log(request);
    }
}
