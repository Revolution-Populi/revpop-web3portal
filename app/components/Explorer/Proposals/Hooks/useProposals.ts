import {useEffect, useState} from "react";
import {Set} from "immutable";
import Proposal from "../../../../Context/Proposal/Domain/Proposal";
import {LoadAll, loadAllHandler} from "../../../../Context/Proposal";
import {ProposalTypes} from "../../../../Context/Proposal/types";
import ProposalsType = ProposalTypes.ProposalsType;

function useProposals() {
    const [proposals, setProposals] = useState<ProposalsType>(Set<Proposal>());

    useEffect(() => {
        loadProposals();
    }, []);

    const loadProposals = async () => {
        const query = new LoadAll();
        const parameters = await loadAllHandler.execute(query);

        setProposals(parameters);
    };

    const updateProposal = (proposal: Proposal) => {
        console.log(proposal);
    };

    return [proposals, updateProposal];
}

export default useProposals;
