import React from "react";
import {Map} from "immutable";
import {Fees} from "../../../Context/Fees/types";
import OperationsType = Fees.OperationsType;

type FeesDefaultsType = {
    operations: OperationsType;
    updateOperations: (operations: OperationsType) => void;
};

const FeesDefaults: FeesDefaultsType = {
    operations: Map(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateOperations: () => {}
};

const FeesContext = React.createContext(FeesDefaults);

export default FeesContext;
export {FeesDefaults};
