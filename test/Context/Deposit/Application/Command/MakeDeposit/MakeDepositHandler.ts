import {expect} from "chai";
import providerResolver from "../../../../../../app/Context/Deposit/Infrastructure/Provider/ProviderResolver";
import StubProvider from "../../../../../../app/Context/Deposit/Infrastructure/Provider/Stub";
import StubSessionRepository from "../../../../../../app/Context/Deposit/Infrastructure/SessionRepository/Stub";
import StubSessionConfirmer from "../../../../../../app/Context/Deposit/Infrastructure/SessionConfirmer/Stub";
import MakeDepositHandler from "../../../../../../app/Context/Deposit/Application/Command/MakeDeposit/MakeDepositHandler";
import {MakeDeposit} from "../../../../../../app/Context/Deposit";
import moment from "moment";
import Session from "../../../../../../app/Context/Deposit/Domain/Session";
import HTLC from "../../../../../../app/Context/Deposit/Domain/HTLC";

describe("MakeDepositHandler", () => {
    let provider: StubProvider;
    let sessionConfirmer: StubSessionConfirmer;
    let sessionRepository: StubSessionRepository;
    let handler: MakeDepositHandler;

    beforeEach(function() {
        provider = providerResolver.stubProvider;
        sessionRepository = new StubSessionRepository();
        sessionConfirmer = new StubSessionConfirmer();
        handler = new MakeDepositHandler(sessionRepository, sessionConfirmer);
    });

    describe("execute", () => {
        describe("success", async () => {
            const revpopAccount = "revpopAccount";
            const hashLock = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
            const fromAddress = "0x9b1eaae87cc3a041c4cef02386109d6ace4e198e";
            const amount = "10000000000000000";
            const timeLock = moment()
                .add(1, "day")
                .unix();

            let session: Session;
            let command: MakeDeposit;

            beforeEach(async () => {
                session = new Session(
                    "0xe7435f68554b20f8c85606a014c258f6e66ed787284e6601a95a769558c62ff1",
                    "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144",
                    "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144",
                    moment()
                        .add(1, "month")
                        .unix()
                );

                command = new MakeDeposit("stub", fromAddress, session.id, revpopAccount, amount, hashLock, timeLock);

                await sessionRepository.clean();
                await sessionRepository.save(session);
            });

            it("should send request to blockchain", async () => {
                const result = await handler.execute(command);
                expect(result.isSuccess()).true;

                expect(provider.size).equals(1);

                const blockchainRequest = provider.last as HTLC;
                expect(blockchainRequest.fromAddress).equals(fromAddress);
                expect(blockchainRequest.amount).equals(amount);
                expect(blockchainRequest.hashLock).equals(hashLock);
                expect(blockchainRequest.timeLock).equals(timeLock);
            });

            it("should send request to EES", async () => {
                const result = await handler.execute(command);
                expect(result.isSuccess()).true;

                expect(sessionConfirmer.size).equals(1);

                const eesRequest = sessionConfirmer.getById(session.id);

                expect(eesRequest.txHash).equals(provider.txHash);
                expect(eesRequest.revpopAccount).equals(revpopAccount);
                expect(eesRequest.hashLock).equals(hashLock);
            });

            it("should update session in local db", async () => {
                const result = await handler.execute(command);
                expect(result.isSuccess()).true;

                expect(sessionRepository.count).equals(1);

                const updatedSession = (await sessionRepository.load(session.id)) as Session;
                expect(updatedSession.canBePaid()).false;
            });
        });
    });
});
