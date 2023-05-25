import {TransactionReceipt} from "web3-core";
import ExternalBlockchainRepositoryInterface from "../../Domain/ExternalBlockchain/RepositoryInterface";
import CreateNewContractRequest from "../../Domain/ExternalBlockchain/CreateNewContractRequest";
import CreateNewContractResponse from "../../Domain/ExternalBlockchain/CreateNewContractResponse";
import RedeemWithdrawRequest from "../../Domain/ExternalBlockchain/RedeemWithdrawRequest";
import RedeemWithdrawResponse from "../../Domain/ExternalBlockchain/RedeemWithdrawResponse";

export default class StubRepository
    implements ExternalBlockchainRepositoryInterface {
    private _requests: CreateNewContractRequest[] = [];
    private _status = true;
    private _txHash =
        "0xdefc225669c161c4acc15e261778499ff4154ed69b88cefed3d3a3bf07748405";
    private _chainId = 1;
    private _redeemWithdrawRequests: RedeemWithdrawRequest[] = [];

    async create(
        request: CreateNewContractRequest
    ): Promise<CreateNewContractResponse> {
        this._requests.push(request);

        return new CreateNewContractResponse(this._status, this._txHash);
    }

    async getTransactionReceipt(
        txHash: string
    ): Promise<TransactionReceipt | null> {
        return null;
    }

    async getContract(
        contractId: string,
        contractAddress: string
    ): Promise<any | null> {
        return {};
    }

    async getChainId(): Promise<number> {
        return this._chainId;
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

    set chainId(value: number) {
        this._chainId = value;
    }

    async redeemWithdraw(
        request: RedeemWithdrawRequest
    ): Promise<RedeemWithdrawResponse> {
        this._redeemWithdrawRequests.push(request);

        return new RedeemWithdrawResponse(this._status, this._txHash);
    }
}
