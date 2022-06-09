import {expect} from "chai";
import moment from "moment";
import {getBlockchainProposal} from "../Utils/BlockchainProposal";
import factory from "../../../../app/Context/Proposal/Infrastructure/Factory";

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
    });
});
