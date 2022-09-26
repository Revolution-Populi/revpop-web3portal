import {expect} from "chai";
import providerResolver from "../../../../../../app/Context/Deposit/Infrastructure/Provider/ProviderResolver";
import CreateContractRequest from "../../../../../../app/Context/Deposit/Infrastructure/Provider/Request";
import StubProvider from "../../../../../../app/Context/Deposit/Infrastructure/Provider/Stub";
import StubSessionRepository from "../../../../../../app/Context/Deposit/Infrastructure/SessionRepository/Stub";
import StubSessionConfirmer from "../../../../../../app/Context/Deposit/Infrastructure/SessionConfirmer/Stub";
import MakeDepositHandler from "../../../../../../app/Context/Deposit/Application/Command/MakeDeposit/MakeDepositHandler";
import {MakeDeposit} from "../../../../../../app/Context/Deposit";
import moment from "moment";
import Session from "../../../../../../app/Context/Deposit/Domain/Session";
import {
    SessionAlreadyPaid,
    SessionNotFoundError
} from "../../../../../../app/Context/Deposit/Application/Command/MakeDeposit/Errors";
import Contract from "../../../../../../app/Context/Deposit/Domain/Contract";

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
        let session: Session;
        let command: MakeDeposit;

        const revpopAccount = "revpopAccount";
        const hashLock = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
        const fromAddress = "0x9b1eaae87cc3a041c4cef02386109d6ace4e198e";
        const amount = "10000000000000000";
        const timeLock = moment()
            .add(1, "day")
            .unix();
        const receiver = "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144";
        const sender = "0x9b1eaae87cc3a041c4cef02386109d6ace5e198e";

        describe("success", async () => {
            beforeEach(async () => {
                session = new Session(
                    "0xe7435f68554b20f8c85606a014c258f6e66ed787284e6601a95a769558c62ff1",
                    "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144",
                    "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144",
                    "10000000000000000",
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

                const blockchainRequest = provider.last as CreateContractRequest;
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

        describe("error", async () => {
            it("session id not exists", async () => {
                command = new MakeDeposit(
                    "stub",
                    fromAddress,
                    "session_not_exists",
                    revpopAccount,
                    amount,
                    hashLock,
                    timeLock
                );
                const result = await handler.execute(command);

                expect(result.isFailure()).true;

                if (result.isFailure()) {
                    expect(result.error).instanceof(SessionNotFoundError);
                }
            });

            it("session can't be paid", async () => {
                session = new Session(
                    "0xe7435f68554b20f8c85606a014c258f6e66ed787284e6601a95a769558c62ff1",
                    "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144",
                    "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144",
                    "10000000000000000",
                    moment()
                        .add(1, "month")
                        .unix()
                );
                const contract = new Contract(receiver, sender, amount, hashLock, timeLock);
                session.pay(provider.txHash, contract);

                command = new MakeDeposit("stub", fromAddress, session.id, revpopAccount, amount, hashLock, timeLock);

                await sessionRepository.clean();
                await sessionRepository.save(session);

                const result = await handler.execute(command);

                expect(result.isFailure()).true;

                if (result.isFailure()) {
                    expect(result.error).instanceof(SessionAlreadyPaid);
                }
            });
        });
    });
});
