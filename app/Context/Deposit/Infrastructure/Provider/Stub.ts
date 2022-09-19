import ProviderInterface from "./ProviderInterface";
import CreateHtlcResponse from "./CreateHtlcResponse";
import HTLC from "../../Domain/HTLC";

export default class StubProvider implements ProviderInterface {
    private _requests: HTLC[] = [];
    private _status = true;
    private _txHash = "0xdefc225669c161c4acc15e261778499ff4154ed69b88cefed3d3a3bf07748405";

    async create(htlc: HTLC): Promise<CreateHtlcResponse> {
        this._requests.push(htlc);

        return new CreateHtlcResponse(this._status, this._txHash);
    }

    get size(): number {
        return this._requests.length;
    }

    clean() {
        this._requests = [];
    }

    get last(): HTLC | null {
        if (this.size === 0) {
            return null;
        }

        return this._requests.pop() as HTLC;
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
