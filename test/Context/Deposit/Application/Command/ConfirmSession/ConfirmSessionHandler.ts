import {expect} from "chai";
import StubSessionConfirmer from "../../../../../../app/Context/Deposit/Infrastructure/SessionConfirmer/Stub";
import StubSessionRepository from "../../../../../../app/Context/Deposit/Infrastructure/SessionRepository/Stub";
import {ConfirmSession, Session} from "../../../../../../app/Context/Deposit";
import ConfirmSessionHandler from "../../../../../../app/Context/Deposit/Application/Command/ConfirmSession/ConfirmSessionHandler";
import {getSession} from "../../../Utilities/Session";

describe("ConfirmSessionHandler", () => {
    let sessionRepository: StubSessionRepository;
    let sessionConfirmer: StubSessionConfirmer;
    let handler: ConfirmSessionHandler;

    const txHash = "0x2592cf699903e83bfd664aa4e339388fd044fe31643a85037be803a5d162729f";
    const hashLock = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";

    beforeEach(function() {
        sessionConfirmer = new StubSessionConfirmer();
        sessionRepository = new StubSessionRepository();
        handler = new ConfirmSessionHandler(sessionRepository, sessionConfirmer);
    });

    describe("execute", () => {
        describe("success", () => {
            let session: Session;

            beforeEach(() => {
                session = getSession();
                sessionRepository.clean();
                sessionRepository.save(session);
            });

            it("should return success response", async () => {
                const command = new ConfirmSession(session.id, txHash, "revpop_account", hashLock);
                const result = await handler.execute(command);

                expect(result.isSuccess()).true;
            });

            it("should send confirm request to the EES", async () => {
                const command = new ConfirmSession(session.id, txHash, "revpop_account", hashLock);
                await handler.execute(command);

                expect(sessionConfirmer.size).equals(1);

                const confirmRequest = sessionConfirmer.getById(session.id);
                expect(confirmRequest).not.null;

                expect(confirmRequest.sessionId).equals(session.id);
                expect(confirmRequest.txHash).equals(txHash);
                expect(confirmRequest.revpopAccount).equals("revpop_account");
                expect(confirmRequest.hashLock).equals(hashLock);
            });

            it("should pay session", async () => {
                const command = new ConfirmSession(session.id, txHash, "revpop_account", hashLock);
                await handler.execute(command);

                expect(session.canBePaid()).false;
            });
        });
    });
});
