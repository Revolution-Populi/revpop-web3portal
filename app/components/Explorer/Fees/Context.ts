import React from "react";
import Operation from "../../../Context/Fees/Domain/Operation";
import {Fees} from "../../../Context/Fees/types";
import OperationsType = Fees.OperationsType;

type FeesDefaultsType = {
    operations: OperationsType;
    loadOperations: () => void;
    updateOperation: (operation: Operation) => void;
    scale: number;
    networkPercentOfFee: number;
};

const FeesDefaults: FeesDefaultsType = {
    operations: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loadOperations: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateOperation: () => {},
    scale: 0,
    networkPercentOfFee: 0
};

const FeesContext = React.createContext(FeesDefaults);

export default FeesContext;
export {FeesDefaults};
