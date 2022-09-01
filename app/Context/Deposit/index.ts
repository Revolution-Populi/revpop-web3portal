import GetLast from "./Application/Query/GetLast/GetLast";
import GetLastHandler from "./Application/Query/GetLast/GetLastHandler";
import GetSessionId from "./Application/Query/GetSessionId/GetSessionId";
import GetSessionIdHandler from "./Application/Query/GetSessionId/GetSessionIdHandler";
import SendTxHash from "./Application/Command/SendTxHash/SendTxHash";
import SendTxHashHandler from "./Application/Command/SendTxHash/SendTxHashHandler";
import MakeDeposit from "./Application/Command/MakeDeposit/MakeDeposit";
import MakeDepositHandler from "./Application/Command/MakeDeposit/MakeDepositHandler";

const getLastHandler = new GetLastHandler();
const getSessionIdHandler = new GetSessionIdHandler();
const sendTxHashHandler = new SendTxHashHandler();
const makeDepositHandler = new MakeDepositHandler();

export {GetLast, getLastHandler};
export {GetSessionId, getSessionIdHandler};
export {SendTxHash, sendTxHashHandler};
export {MakeDeposit, makeDepositHandler};
