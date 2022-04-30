import React from "react";
import {Map} from "immutable";

const ProposalsDefaults = {
    proposals: new Map()
};

const ProposalsContext = React.createContext(ProposalsDefaults);

export default ProposalsContext;
