import CreateNewContractRequest from "./CreateNewContractRequest";
import CreateNewContractResponse from "./CreateNewContractResponse";

export default interface ExternalBlockchainRepositoryInterface {
    create: (
        createNewContractRequest: CreateNewContractRequest
    ) => Promise<CreateNewContractResponse>;
}
