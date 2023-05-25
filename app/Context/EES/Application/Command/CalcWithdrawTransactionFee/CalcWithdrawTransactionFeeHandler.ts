import CalcWithdrawTransactionFee from "./CalcWithdrawTransactionFee";
import {checkFeeStatusAsync} from "../../../../../lib/common/trxHelper";

export default class CalcWithdrawTransactionFeeHandler {
    public execute(command: CalcWithdrawTransactionFee): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            checkFeeStatusAsync({
                type: "transfer",
                accountID: command.account.get("id"),
                feeID: command.assetId,
                data: undefined
            })
                .then(({fee}) => {
                    const transferFee = fee;
                    checkFeeStatusAsync({
                        type: "htlc_create",
                        accountID: command.account.get("id"),
                        feeID: command.assetId,
                        data: {
                            type: "memo",
                            content: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                        }
                    })
                        .then(({fee}) => {
                            resolve(
                                transferFee.amount /
                                    Math.pow(10, transferFee.precision) +
                                    fee.amount / Math.pow(10, fee.precision)
                            );
                        })
                        .catch(reject);
                })
                .catch(reject);

            // if (!hasPoolBalanceForTransferFee) {
            //     throw new Errors.EmptyFeePool();
            // }
            //
            // const {
            //     htlcCreateFee,
            //     hasPoolBalanceForHtlcCreateFee
            // } = await checkFeeStatusAsync({
            //     type: "htlc_create",
            //     accountID: command.account.get("id"),
            //     feeID: command.assetId,
            //     data: {}
            // });

            // if (!hasPoolBalanceForHtlcCreateFee) {
            //     throw new Errors.EmptyFeePool();
            // }

            // return transferFee + htlcCreateFee;
        });
    }
}
