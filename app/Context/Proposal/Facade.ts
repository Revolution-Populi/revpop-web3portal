import {Moment} from "moment";
import {Create, createHandler} from "./";
import {Result} from "../Core/Logic/Result";
import {AppError} from "../Core/Logic/AppError";

export async function createProposal(
    transaction: unknown,
    expirationTime: Moment,
    reviewPeriod: number
): Promise<Result<AppError, boolean>> {
    const command = new Create(transaction, expirationTime, reviewPeriod);
    return await createHandler.execute(command);
}
