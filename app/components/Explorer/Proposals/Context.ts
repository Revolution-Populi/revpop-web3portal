import React from "react";
import {Set} from "immutable";
import Proposal from "../../../Context/Proposal/Domain/Proposal";

const ProposalsDefaults = {
    proposals: Set(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateProposal: (proposal: Proposal) => {}
};

const ProposalsContext = React.createContext(ProposalsDefaults);

export default ProposalsContext;
