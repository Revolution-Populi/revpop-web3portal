import {expect} from "chai";
import moment from "moment";
import {
    getBlockchainProposal,
    getBlockchainProposalWithOperations,
    getBlockchainProposalWithParameters,
    getBlockchainProposalWrongTransactionId
} from "../Utils/BlockchainProposal";
import factory from "../../../../app/Context/Proposal/Infrastructure/Factory";
import Parameter from "../../../../app/Context/Proposal/Domain/Parameter";
import {ProposalTypes} from "../../../../app/Context/Proposal/types";
import ParameterValueType = ProposalTypes.ParameterValueType;

describe("Factory", () => {
    describe("execute", () => {
        describe("with invalid operation id in blockchain proposal", async () => {
            it("should throw error", async () => {
                const blockchainProposal = getBlockchainProposalWrongTransactionId();

                expect(factory.fromBlockchain.bind(factory, blockchainProposal, "1.10.5")).to.throw(
                    "Invalid proposed operation id"
                );
            });
        });

        it("should create proposal with correct parameters", async () => {
            const blockchainProposal = getBlockchainProposal();
            const proposal = factory.fromBlockchain(blockchainProposal, "1.10.5");

            expect(proposal.id).equals(blockchainProposal.id);
            expect(proposal.expirationDate).eqls(moment(blockchainProposal.expiration_time));
            expect(proposal.reviewPeriod).eqls(moment(blockchainProposal.review_period_time));
        });

        describe("voted method", async () => {
            it("should return false if account not in 'available_active_approvals' property", async () => {
                const blockchainProposal = getBlockchainProposal({
                    available_active_approvals: ["1.10.10"]
                });
                const proposal = factory.fromBlockchain(blockchainProposal, "1.10.5");

                expect(proposal.voted).false;
            });
            it("should return true if account in 'available_active_approvals' property", async () => {
                const blockchainProposal = getBlockchainProposal({
                    available_active_approvals: ["1.10.7"]
                });
                const proposal = factory.fromBlockchain(blockchainProposal, "1.10.7");

                expect(proposal.voted).true;
            });
        });

        describe("blockchain proposal with changed parameters", async () => {
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

                assertParameter(result.parameters.first(), "parameter_1", 4);
                assertParameter(result.parameters.last(), "parameter_2", true);
            });
        });

        describe("blockchain proposal with changed operations (fees)", async () => {
            it("should return correct operation with fees", async () => {
                const result = factory.fromBlockchain(
                    getBlockchainProposalWithOperations([
                        [0, {fee1: 100}],
                        [1, {fee1: 200, fee2: 300}]
                    ]),
                    "1.10.5"
                );

                expect(result.operations.size).equals(2);

                const operation0 = result.operations.first();
                expect(operation0.changed).false;
                expect(operation0.fees[0].code).equals("fee1");
                expect(operation0.fees[0].value).equals(100);
                expect(operation0.fees[0].changed).false;
            });
        });
    });
});

function assertParameter(parameter: Parameter, name: string, value: ParameterValueType) {
    expect(parameter.name).equals(name);
    expect(parameter.value).equals(value);
}
