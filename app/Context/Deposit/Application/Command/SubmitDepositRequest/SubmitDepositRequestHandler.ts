import SubmitDepositRequest from "./SubmitDepositRequest";
import SessionRepositoryInterface from "../../../Domain/SessionRepositoryInterface";
import Session from "../../../Domain/Session";
import {EesConnectionError, Result} from "../../../../Core";
import axios from "axios";
import {EesAPI} from "../../../../../api/apiConfig";

type ErrorsType = EesConnectionError;

export default class SubmitDepositRequestHandler {
    constructor(private sessionRepository: SessionRepositoryInterface) {}

    async execute(command: SubmitDepositRequest): Promise<Session> {
        try {
            const result = await axios.post(
                EesAPI.BASE + EesAPI.SUBMIT_DEPOSIT_REQUEST,
                {
                    revpopAccount: command.revpopAccount,
                    hashLock: command.hashLock
                }
            );
        } catch (e) {
            throw new Error("Error while submit deposit request");
        }

        //TODO::Save session locally

        throw new Error();
    }
}
