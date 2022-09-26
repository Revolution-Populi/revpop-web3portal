import SessionFetcherInterface from "../../Domain/SessionFetcherInterface";
import Session from "../../Domain/Session";
import moment from "moment";
import {AppError, Result} from "../../../Core";
import {Success} from "../../../Core/Logic/Result";

export default class Stub implements SessionFetcherInterface {
    private sessionId = "0xe7435f68554b20f8c85606a014c258f6e66ed787284e6601a95a769558c62ff1";
    private smartContractAddress = "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144";
    private receiverAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
    private minimumDeposit = "10000000000000000";
    private minimumTimeLock = moment().add("1", "month");

    fetch(): Promise<Result<AppError, Session>> {
        const session = new Session(
            this.sessionId,
            this.smartContractAddress,
            this.receiverAddress,
            this.minimumDeposit,
            this.minimumTimeLock.unix()
        );

        return Promise.resolve(Success.create(session));
    }
}
