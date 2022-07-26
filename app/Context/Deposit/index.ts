import GetLast from "./Application/Query/GetLast/GetLast";
import GetLastHandler from "./Application/Query/GetLast/GetLastHandler";
import MakeDeposit from "./Application/Command/MakeDeposit/MakeDeposit";
import MakeDepositHandler from "./Application/Command/MakeDeposit/MakeDepositHandler";

const getLastHandler = new GetLastHandler();
const makeDepositHandler = new MakeDepositHandler();

export {GetLast, getLastHandler};
export {MakeDeposit, makeDepositHandler};
