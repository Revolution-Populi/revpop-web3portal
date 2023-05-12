import Session from "./Domain/Session";
import EesRepository from "./Infrastructure/EES/Repository";
import Web3Repository from "./Infrastructure/ExternalBlockchain/Web3Repository";
import SessionRepository from "./Infrastructure/SessionRepository/IndexedDB";
import SubmitDepositRequest from "./Application/Command/SubmitDepositRequest/SubmitDepositRequest";
import SubmitDepositRequestHandler from "./Application/Command/SubmitDepositRequest/SubmitDepositRequestHandler";
import MakeDeposit from "./Application/Command/MakeDeposit/MakeDeposit";
import MakeDepositHandler from "./Application/Command/MakeDeposit/MakeDepositHandler";
import AddTransactionManually from "./Application/Command/AddTransactionManually/AddTransactionManually";
import AddTransactionManuallyHandler from "./Application/Command/AddTransactionManually/AddTransactionManuallyHandler";
import GetSession from "./Application/Query/GetSession/GetSession";
import GetSessionHandler from "./Application/Query/GetSession/GetSessionHandler";
import GetSessions from "./Application/Query/GetSessions/GetSessions";
import GetSessionsHandler from "./Application/Query/GetSessions/GetSessionsHandler";

const eesRepository = new EesRepository();
const web3Repository = new Web3Repository();
const sessionRepository = new SessionRepository();

const submitDepositRequestHandler = new SubmitDepositRequestHandler(
    eesRepository,
    sessionRepository
);
const makeDepositHandler = new MakeDepositHandler(
    sessionRepository,
    eesRepository,
    web3Repository
);
const addTransactionManuallyHandler = new AddTransactionManuallyHandler(
    sessionRepository,
    eesRepository,
    web3Repository
);
const getSessionsHandler = new GetSessionsHandler(sessionRepository);
const getSessionHandler = new GetSessionHandler(sessionRepository);

export {Session};
export {MakeDeposit, makeDepositHandler};
export {SubmitDepositRequest, submitDepositRequestHandler};
export {AddTransactionManually, addTransactionManuallyHandler};
export {GetSessions, getSessionsHandler};
export {GetSession, getSessionHandler};
