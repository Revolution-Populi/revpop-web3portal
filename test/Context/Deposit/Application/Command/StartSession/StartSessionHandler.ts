import {expect} from "chai";
import StubSessionFetcher from "../../../../../../app/Context/Deposit/Infrastructure/SessionFetcher/Stub";
import StubSessionRepository from "../../../../../../app/Context/Deposit/Infrastructure/SessionRepository/Stub";
import StartSessionHandler from "../../../../../../app/Context/Deposit/Application/Command/StartSession/StartSessionHandler";
import {StartSession} from "../../../../../../app/Context/Deposit";

describe("StartSessionHandler", () => {
    let sessionFetcher: StubSessionFetcher;
    let sessionRepository: StubSessionRepository;
    let handler: StartSessionHandler;

    beforeEach(function() {
        sessionFetcher = new StubSessionFetcher();
        sessionRepository = new StubSessionRepository();
        handler = new StartSessionHandler(sessionRepository, sessionFetcher);
    });

    describe("execute", () => {
        it("success", async () => {
            const command = new StartSession();
            const result = await handler.execute(command);

            expect(sessionRepository.count).equals(1);
        });
    });
});
