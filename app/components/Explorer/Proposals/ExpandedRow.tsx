import React from "react";
import ExpandedRowParameters from "./ExpandedRowParameters";
import ExpandedRowOperations from "./ExpandedRowOperations";
import {ProposalViewType} from "./ViewModal/ModelViewTransformer";

interface props {
    proposal: ProposalViewType;
}

export default function ExpandedRow({proposal}: props) {
    return (
        <>
            <ExpandedRowParameters parameters={proposal.parameters} />
            <ExpandedRowOperations operations={proposal.operations} />
        </>
    );
}
