import React from "react";
import {Map} from "immutable";

const NetworkParametersDefaults = {
    parameters: new Map()
};

const NetworkParametersContext = React.createContext(NetworkParametersDefaults);

export default NetworkParametersContext;
export {NetworkParametersDefaults};
