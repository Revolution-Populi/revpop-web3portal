import Session from "./Domain/Session";
import EesRepository from "./Infrastructure/EES/Repository";
import Web3Repository from "./Infrastructure/ExternalBlockchain/Web3Repository";
import SessionRepository from "./Infrastructure/SessionRepository/IndexedDB";
import SubmitWithdrawRequest from "./Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequest";
import MakeWithdraw from "./Application/Command/MakeWithdraw/MakeWithdraw";
import GetSession from "./Application/Query/GetSession/GetSession";
import GetSessionHandler from "./Application/Query/GetSession/GetSessionHandler";
import GetSessions from "./Application/Query/GetSessions/GetSessions";
import GetSessionsHandler from "./Application/Query/GetSessions/GetSessionsHandler";
import SubmitWithdrawRequestHandler from "./Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequestHandler";
import MakeWithdrawHandler from "./Application/Command/MakeWithdraw/MakeWithdrawHandler";

const eesRepository = new EesRepository();
const web3Repository = new Web3Repository();
const sessionRepository = new SessionRepository();

const submitWithdrawRequestHandler = new SubmitWithdrawRequestHandler(
    eesRepository,
    sessionRepository
);
const makeWithdrawHandler = new MakeWithdrawHandler(
    sessionRepository,
    eesRepository,
    web3Repository
);

const getSessionsHandler = new GetSessionsHandler(sessionRepository);
const getSessionHandler = new GetSessionHandler(sessionRepository);

export {Session};
export {MakeWithdraw, makeWithdrawHandler};
export {SubmitWithdrawRequest, submitWithdrawRequestHandler};
// export {AddTransactionManually, addTransactionManuallyHandler};
export {GetSessions, getSessionsHandler};
export {GetSession, getSessionHandler};
