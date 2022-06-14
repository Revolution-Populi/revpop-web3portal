import Proposal from "../../../../app/Context/Proposal/Domain/Proposal";
import {Set} from "immutable";
import moment from "moment";
import {ProposalTypes} from "../../../../app/Context/Proposal/types";
import ParametersType = ProposalTypes.ParametersType;

export function getProposal(
    id?: string,
    proposalParameters?: ParametersType
): Proposal {
    return new Proposal(
        id ?? "1.10.1",
        proposalParameters ?? Set(),
        moment(),
        moment()
    );
}
