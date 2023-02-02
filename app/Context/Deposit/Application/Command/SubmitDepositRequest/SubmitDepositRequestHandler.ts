import SubmitDepositRequest from "./SubmitDepositRequest";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import Session from "../../../Domain/Session";
import {EesConnectionError, Result} from "../../../../Core";
import axios from "axios";
import {EesAPI} from "../../../../../api/apiConfig";

type ErrorsType = EesConnectionError;

export default class SubmitDepositRequestHandler {
    constructor(private sessionRepository: SessionRepositoryInterface) {}

    async execute(command: SubmitDepositRequest): Promise<string> {
        let depositRequestId: string;

        try {
            const result = await axios.post(
                EesAPI.BASE + EesAPI.SUBMIT_DEPOSIT_REQUEST,
                {
                    revpopAccount: command.revpopAccount,
                    hashLock: this.ensureHasPrefix(command.hashLock)
                }
            );

            depositRequestId = result.data.id;
        } catch (e) {
            throw new Error("Error while submit deposit request");
        }

        const session = Session.create(
            depositRequestId,
            command.value,
            command.hashLock,
            command.timeLock
        );

        await this.sessionRepository.save(session);

        return session.id;
    }

    ensureHasPrefix(hashLock: string) {
        if ("0x" !== hashLock.substring(0, 2)) {
            hashLock = "0x" + hashLock;
        }

        return hashLock;
    }
}
