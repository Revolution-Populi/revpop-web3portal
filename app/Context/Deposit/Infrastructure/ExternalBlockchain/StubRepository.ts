import ExternalBlockchainRepositoryInterface from "../../Domain/ExternalBlockchain/RepositoryInterface";
import CreateNewContractRequest from "../../Domain/ExternalBlockchain/CreateNewContractRequest";
import CreateNewContractResponse from "../../Domain/ExternalBlockchain/CreateNewContractResponse";

export default class StubRepository
    implements ExternalBlockchainRepositoryInterface {
    private _requests: CreateNewContractRequest[] = [];
    private _status = true;
    private _txHash =
        "0xdefc225669c161c4acc15e261778499ff4154ed69b88cefed3d3a3bf07748405";

    async create(
        request: CreateNewContractRequest
    ): Promise<CreateNewContractResponse> {
        this._requests.push(request);

        return new CreateNewContractResponse(this._status, this._txHash);
    }

    get size(): number {
        return this._requests.length;
    }

    clean() {
        this._requests = [];
    }

    get last(): CreateNewContractRequest | null {
        if (this.size === 0) {
            return null;
        }

        return this._requests.pop() as CreateNewContractRequest;
    }

    get txHash(): string {
        return this._txHash;
    }

    set txHash(value: string) {
        this._txHash = value;
    }

    set status(value: boolean) {
        this._status = value;
    }
}
