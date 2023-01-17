import Session from "./Domain/Session";
import GetSession from "./Application/Query/GetSession/GetSession";
import GetSessionHandler from "./Application/Query/GetSession/GetSessionHandler";
import GetSessions from "./Application/Query/GetSessions/GetSessions";
import GetSessionsHandler from "./Application/Query/GetSessions/GetSessionsHandler";
import SessionRepository from "./Infrastructure/SessionRepository/IndexedDB";
import CheckBlockchainContract from "./Application/Command/CheckBlockchainContract/CheckBlockchainContract";
import CheckBlockchainContractHandler from "./Application/Command/CheckBlockchainContract/CheckBlockchainContractHandler";
import HtlcBlockchainRepository from "./Infrastructure/HtlcRepository/Blockchain";
import SubmitDepositRequest from "./Application/Command/SubmitDepositRequest/SubmitDepositRequest";
import SubmitDepositRequestHandler from "./Application/Command/SubmitDepositRequest/SubmitDepositRequestHandler";

const sessionRepository = new SessionRepository();
const htlcBlockchainRepository = new HtlcBlockchainRepository();

const submitDepositRequestHandler = new SubmitDepositRequestHandler(
    sessionRepository
);

const getSessionsHandler = new GetSessionsHandler(sessionRepository);
const getSessionHandler = new GetSessionHandler(sessionRepository);
const checkBlockchainContract = new CheckBlockchainContractHandler(
    htlcBlockchainRepository
);

export {Session};
export {SubmitDepositRequest, submitDepositRequestHandler};
export {GetSessions, getSessionsHandler};
export {GetSession, getSessionHandler};
export {CheckBlockchainContract, checkBlockchainContract};
