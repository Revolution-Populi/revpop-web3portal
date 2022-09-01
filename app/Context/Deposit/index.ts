import GetLast from "./Application/Query/GetLast/GetLast";
import GetLastHandler from "./Application/Query/GetLast/GetLastHandler";
import GetSessionId from "./Application/Query/GetSessionId/GetSessionId";
import GetSessionIdHandler from "./Application/Query/GetSessionId/GetSessionIdHandler";
import MakeDeposit from "./Application/Command/MakeDeposit/MakeDeposit";
import MakeDepositHandler from "./Application/Command/MakeDeposit/MakeDepositHandler";

const getLastHandler = new GetLastHandler();
const makeDepositHandler = new MakeDepositHandler();
const getSessionIdHandler = new GetSessionIdHandler();

export {GetLast, getLastHandler};
export {GetSessionId, getSessionIdHandler};
export {MakeDeposit, makeDepositHandler};
