import Request from "./Request";
import Response from "./Response";

export default interface ProviderInterface {
    create: (request: Request) => Promise<Response>;
}
