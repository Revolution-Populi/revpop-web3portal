import Session from "./Domain/Session";
import GetSession from "./Application/Query/GetSession/GetSession";
import GetSessionHandler from "./Application/Query/GetSession/GetSessionHandler";
import GetSessions from "./Application/Query/GetSessions/GetSessions";
import GetSessionsHandler from "./Application/Query/GetSessions/GetSessionsHandler";
import ConfirmSession from "./Application/Command/ConfirmSession/ConfirmSession";
import ConfirmSessionHandler from "./Application/Command/ConfirmSession/ConfirmSessionHandler";
import MakeDeposit from "./Application/Command/MakeDeposit/MakeDeposit";
import MakeDepositHandler from "./Application/Command/MakeDeposit/MakeDepositHandler";
import SessionFetcher from "./Infrastructure/SessionFetcher/EES";
import SessionConfirmer from "./Infrastructure/SessionConfirmer/EES";
import SessionRepository from "./Infrastructure/SessionRepository/IndexedDB";
import StartSession from "./Application/Command/StartSession/StartSession";
import StartSessionHandler from "./Application/Command/StartSession/StartSessionHandler";
import CheckBlockchainContract from "./Application/Command/CheckBlockchainContract/CheckBlockchainContract";
import CheckBlockchainContractHandler from "./Application/Command/CheckBlockchainContract/CheckBlockchainContractHandler";
import HtlcBlockchainRepository from "./Infrastructure/HtlcRepository/Blockchain";

const sessionFetcher = new SessionFetcher();
const sessionConfirmer = new SessionConfirmer();
const sessionRepository = new SessionRepository();
const htlcBlockchainRepository = new HtlcBlockchainRepository();

const initializeSessionHandler = new StartSessionHandler(
    sessionRepository,
    sessionFetcher
);
const confirmSessionHandler = new ConfirmSessionHandler(
    sessionRepository,
    sessionConfirmer
);
const makeDepositHandler = new MakeDepositHandler(
    sessionRepository,
    sessionConfirmer
);
const getSessionsHandler = new GetSessionsHandler(sessionRepository);
const getSessionHandler = new GetSessionHandler(sessionRepository);
const checkBlockchainContract = new CheckBlockchainContractHandler(
    htlcBlockchainRepository
);

export {Session};
export {StartSession, initializeSessionHandler};
export {ConfirmSession, confirmSessionHandler};
export {MakeDeposit, makeDepositHandler};
export {GetSessions, getSessionsHandler};
export {GetSession, getSessionHandler};
export {CheckBlockchainContract, checkBlockchainContract};
