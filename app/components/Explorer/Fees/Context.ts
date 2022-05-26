import React from "react";
import {Map} from "immutable";

const FeesDefaults = {
    operations: Map()
};

const FeesContext = React.createContext(FeesDefaults);

export default FeesContext;
export {FeesDefaults};
