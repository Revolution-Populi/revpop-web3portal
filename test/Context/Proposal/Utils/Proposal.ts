import Proposal from "../../../../app/Context/Proposal/Domain/Proposal";
import {Set} from "immutable";
import moment from "moment";
import Operation from "../../../../app/Context/Fees/Domain/Operation";

export type ProposalConstructorType = Partial<ConstructorParameters<typeof Proposal>>;

export function getProposal(props: ProposalConstructorType): Proposal {
    return new Proposal(props[0] ?? "1.10.1", props[1] ?? Set(), props[2] ?? Set(), moment(), moment());
}
