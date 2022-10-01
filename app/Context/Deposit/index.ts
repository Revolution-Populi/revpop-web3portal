import Session from "./Domain/Session";
import GetSession from "./Application/Query/GetSession/GetSession";
import GetSessionHandler from "./Application/Query/GetSession/GetSessionHandler";
import GetSessions from "./Application/Query/GetSessions/GetSessions";
import GetSessionsHandler from "./Application/Query/GetSessions/GetSessionsHandler";
import SendTxHash from "./Application/Command/SendTxHash/SendTxHash";
import SendTxHashHandler from "./Application/Command/SendTxHash/SendTxHashHandler";
import MakeDeposit from "./Application/Command/MakeDeposit/MakeDeposit";
import MakeDepositHandler from "./Application/Command/MakeDeposit/MakeDepositHandler";
import SessionFetcher from "./Infrastructure/SessionFetcher/EES";
import SessionConfirmer from "./Infrastructure/SessionConfirmer/EES";
import SessionRepository from "./Infrastructure/SessionRepository/IndexedDB";
import StartSession from "./Application/Command/StartSession/StartSession";
import StartSessionHandler from "./Application/Command/StartSession/StartSessionHandler";

const sessionFetcher = new SessionFetcher();
const sessionConfirmer = new SessionConfirmer();
const sessionRepository = new SessionRepository();

const getSessionsHandler = new GetSessionsHandler(sessionRepository);
const getSessionHandler = new GetSessionHandler(sessionRepository);
const sendTxHashHandler = new SendTxHashHandler();
const makeDepositHandler = new MakeDepositHandler(sessionRepository, sessionConfirmer);
const startSessionHandler = new StartSessionHandler(sessionRepository, sessionFetcher);

export {Session};
export {GetSessions, getSessionsHandler};
export {GetSession, getSessionHandler};
export {SendTxHash, sendTxHashHandler};
export {MakeDeposit, makeDepositHandler};
export {StartSession, startSessionHandler};
