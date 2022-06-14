import Vote from "./Vote";
import RepositoryInterface from "../../../Domain/RepositoryInterface";
import {Either, Failure, Success} from "../../../../Core/Logic/Result";
import {UnexpectedError} from "../../../../Core/Logic/AppError";
import Proposal from "../../../Domain/Proposal";
import {ProposalTypes} from "../../../types";
import ProposalsType = ProposalTypes.ProposalsType;

type Response = Either<UnexpectedError, ProposalsType>;

export default class VoteHandler {
    constructor(private repository: RepositoryInterface) {}

    async execute(command: Vote): Promise<Response> {
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
            await this.repository.vote(command.proposalId);
        } catch (error) {
            return Failure.create(new UnexpectedError(error)) as Response;
        }

        proposal.setVoted();
        proposals = proposals.add(proposal);

        return Success.create(proposals) as Response;
    }
}
