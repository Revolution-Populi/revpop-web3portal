import Request from "./CreateHtlcRequest";
import Response from "./CreateHtlcResponse";

export default interface ProviderInterface {
    create: (request: Request) => Promise<Response>;
}
