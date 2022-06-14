import RevokeVote from "./RevokeVote";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {Either, Failure, Success} from "../../../../Core/Logic/Result";
import {UnexpectedError} from "../../../../Core/Logic/AppError";
import Proposal from "../../../Domain/Proposal";
import {ProposalTypes} from "../../../types";
import ProposalsType = ProposalTypes.ProposalsType;

type Response = Either<UnexpectedError, ProposalsType>;

export default class RevokeVoteHandler {
    constructor(private repository: RepositoryInterface) {}

    async execute(command: RevokeVote): Promise<Response> {
        let proposals = command.proposals;

        const proposal = proposals.find(proposal => {
            proposal = proposal as Proposal;
            return proposal.id == command.proposalId;
        });

        if (undefined === proposal) {
            return Failure.create(
                new UnexpectedError("proposal is not found")
            ) as Response;
        }

        try {
            await this.repository.revokeVote(command.proposalId);
        } catch (error) {
            return Failure.create(new UnexpectedError(error)) as Response;
        }

        proposal.revokeVote();
        proposals = proposals.add(proposal);

        return Success.create(proposals) as Response;
    }
}
