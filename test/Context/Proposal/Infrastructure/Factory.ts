import {expect} from "chai";
import moment from "moment";
import {
    getBlockchainProposal,
    getBlockchainProposalWithParameters,
    getBlockchainProposalWrongTransactionId
} from "../Utils/BlockchainProposal";
import factory from "../../../../app/Context/Proposal/Infrastructure/Factory";
import Parameter from "../../../../app/Context/Proposal/Domain/Parameter";
import {ProposalTypes} from "../../../../app/Context/Proposal/types";
import ParameterValueType = ProposalTypes.ParameterValueType;

describe("Factory", () => {
    describe("execute", () => {
        describe("fromBlockchain", async () => {
            it("should create proposal appropriate parameters", async () => {
                const blockchainProposal = getBlockchainProposal();
                const proposal = factory.fromBlockchain(
                    blockchainProposal,
                    "1.10.5"
                );

                expect(proposal.id).equals(blockchainProposal.id);
                expect(proposal.expirationDate).eqls(
                    moment(blockchainProposal.expiration_time)
                );
                expect(proposal.reviewPeriod).eqls(
                    moment(blockchainProposal.review_period_time)
                );
            });
        });

        describe("voted method", async () => {
            it("should return false if account not in 'available_active_approvals' property", async () => {
                const blockchainProposal = getBlockchainProposal({
                    available_active_approvals: ["1.10.10"]
                });
                const proposal = factory.fromBlockchain(
                    blockchainProposal,
                    "1.10.5"
                );

                expect(proposal.voted).false;
            });
            it("should return true if account in 'available_active_approvals' property", async () => {
                const blockchainProposal = getBlockchainProposal({
                    available_active_approvals: ["1.10.7"]
                });
                const proposal = factory.fromBlockchain(
                    blockchainProposal,
                    "1.10.7"
                );

                expect(proposal.voted).true;
            });
        });

        describe("parameters property", async () => {
            describe("with invalid blockchain proposal", async () => {
                it("should throw error with wrong operation id", async () => {
                    const blockchainProposal = getBlockchainProposalWrongTransactionId();

                    expect(
                        factory.fromBlockchain.bind(
                            factory,
                            blockchainProposal,
                            "1.10.5"
                        )
                    ).to.throw("Invalid proposed operation id");
                });
            });

            describe("with correct proposal", async () => {
                it("should return correct parameters count", async () => {
                    const result = factory.fromBlockchain(
                        getBlockchainProposalWithParameters({
                            parameter_1: 4,
                            parameter_2: true
                        }),
                        "1.10.5"
                    );

                    expect(result.parameters.size).equals(2);
                });

                it("should return correct parameters", async () => {
                    const result = factory.fromBlockchain(
                        getBlockchainProposalWithParameters({
                            parameter_1: 4,
                            parameter_2: true
                        }),
                        "1.10.5"
                    );

                    assertParameter(
                        result.parameters.first(),
                        "parameter_1",
                        4
                    );
                    assertParameter(
                        result.parameters.last(),
                        "parameter_2",
                        true
                    );
                });
            });
        });
    });
});

function assertParameter(
    parameter: Parameter,
    name: string,
    value: ParameterValueType
) {
    expect(parameter.name).equals(name);
    expect(parameter.value).equals(value);
}
