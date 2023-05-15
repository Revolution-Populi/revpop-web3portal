import HTLC from "../../Domain/HTLC";
import CreateHtlcResponse from "./CreateHtlcResponse";

export default interface ProviderInterface {
    create: (htlc: HTLC) => Promise<CreateHtlcResponse>;
}
