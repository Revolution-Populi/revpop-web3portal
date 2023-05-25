import Session from "./Domain/Deposit/Session";
import WithdrawSession from "./Domain/Withdraw/WithdrawSession";
import EesRepository from "./Infrastructure/EES/Repository";
import Web3Repository from "./Infrastructure/ExternalBlockchain/Web3Repository";
import SessionRepository from "./Infrastructure/SessionRepository/IndexedDBDepositSessionRepository";
import WithdrawSessionRepository from "./Infrastructure/WithdrawSessionRepository/IndexedDBWithdrawSessionRepository";
import SubmitDepositRequest from "./Application/Command/SubmitDepositRequest/SubmitDepositRequest";
import SubmitDepositRequestHandler from "./Application/Command/SubmitDepositRequest/SubmitDepositRequestHandler";
import SubmitWithdrawRequest from "./Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequest";
import SubmitWithdrawRequestHandler from "./Application/Command/SubmitWithdrawRequest/SubmitWithdrawRequestHandler";
import MakeDeposit from "./Application/Command/MakeDeposit/MakeDeposit";
import MakeDepositHandler from "./Application/Command/MakeDeposit/MakeDepositHandler";
import AddTransactionManually from "./Application/Command/AddTransactionManually/AddTransactionManually";
import AddTransactionManuallyHandler from "./Application/Command/AddTransactionManually/AddTransactionManuallyHandler";
import GetSession from "./Application/Query/GetSession/GetSession";
import GetSessionHandler from "./Application/Query/GetSession/GetSessionHandler";
import GetSessions from "./Application/Query/GetSessions/GetSessions";
import GetSessionsHandler from "./Application/Query/GetSessions/GetSessionsHandler";
import CalcWithdrawTransactionFeeHandler from "./Application/Command/CalcWithdrawTransactionFee/CalcWithdrawTransactionFeeHandler";
import CalcWithdrawTransactionFee from "./Application/Command/CalcWithdrawTransactionFee/CalcWithdrawTransactionFee";
import MakeWithdraw from "./Application/Command/MakeWithdraw/MakeWithdraw";
import MakeWithdrawHandler from "./Application/Command/MakeWithdraw/MakeWithdrawHandler";
import GetWithdrawSessionHandler from "./Application/Query/GetWithdrawSession/GetWithdrawSessionHandler";
import GetWithdrawSession from "./Application/Query/GetWithdrawSession/GetWithdrawSession";
import RevpopRepository from "./Infrastructure/InternalBlockchain/Repository/RevpopReposistory";

const eesRepository = new EesRepository();
const web3Repository = new Web3Repository();
const sessionRepository = new SessionRepository();
const withdrawSessionRepository = new WithdrawSessionRepository();
const internalRepository = RevpopRepository.create();

const submitDepositRequestHandler = new SubmitDepositRequestHandler(
    eesRepository,
    sessionRepository
);
const submitWithdrawRequestHandler = new SubmitWithdrawRequestHandler(
    eesRepository,
    withdrawSessionRepository
);
const makeDepositHandler = new MakeDepositHandler(
    sessionRepository,
    eesRepository,
    web3Repository
);
const makeWithdrawHandler = new MakeWithdrawHandler(
    withdrawSessionRepository,
    eesRepository,
    internalRepository
);
const addTransactionManuallyHandler = new AddTransactionManuallyHandler(
    sessionRepository,
    eesRepository,
    web3Repository
);
const getSessionsHandler = new GetSessionsHandler(sessionRepository);
const getSessionHandler = new GetSessionHandler(sessionRepository);
const getWithdrawSessionHandler = new GetWithdrawSessionHandler(
    withdrawSessionRepository
);
const calcWithdrawTransactionFee = new CalcWithdrawTransactionFeeHandler();

export {Session};
export {MakeDeposit, makeDepositHandler};
export {MakeWithdraw, makeWithdrawHandler, WithdrawSession};
export {SubmitDepositRequest, submitDepositRequestHandler};
export {SubmitWithdrawRequest, submitWithdrawRequestHandler};
export {AddTransactionManually, addTransactionManuallyHandler};
export {GetSessions, getSessionsHandler};
export {GetWithdrawSession, getWithdrawSessionHandler};
export {GetSession, getSessionHandler};
export {CalcWithdrawTransactionFee, calcWithdrawTransactionFee};
