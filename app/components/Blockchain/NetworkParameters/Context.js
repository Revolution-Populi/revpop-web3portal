import React from "react";

const NetworkParametersDefaults = {
    isVisibleEditModal: false,
    showEditModal: () => {},
    saveEditModal: () => {},
    cancelEditModal: () => {}
};

const NetworkParametersContext = React.createContext(NetworkParametersDefaults);

export default NetworkParametersContext;
export {NetworkParametersDefaults};
