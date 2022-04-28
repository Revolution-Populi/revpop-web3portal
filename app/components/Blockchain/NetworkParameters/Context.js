import React from "react";
import {Map} from "immutable";

const NetworkParametersDefaults = {
    parameters: new Map()

    // showEditModal: () => {},
    // saveEditModal: () => {},
    // cancelEditModal: () => {}
};

const NetworkParametersContext = React.createContext(NetworkParametersDefaults);

export default NetworkParametersContext;
export {NetworkParametersDefaults};
