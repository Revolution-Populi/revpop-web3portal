import React from "react";
import {Set} from "immutable";

const ProposalsDefaults = {
    proposals: Set(),
    setProposals: () => {}
};

const ProposalsContext = React.createContext(ProposalsDefaults);

export default ProposalsContext;
