import moment from "moment";
import WithdrawSession, {STATUS} from "../../Domain/Withdraw/WithdrawSession";
import ExternalContract from "../../Domain/ExternalBlockchain/Contract";
import InternalContract from "../../Domain/InternalBlockchain/Contract";

export interface ExternalContractJson {
    txHash: string;
}

export interface InternalContractJson {
    id: string;
}

export interface SessionJson {
    id: string;
    internalAccount: string;
    value: number;
    hashLock: string;
    withdrawalFeeCurrency: string;
    withdrawalFeeAmount: number;
    transactionFeeCurrency: string;
    transactionFeeAmount: number;
    ethereumAddress: string;
    status: number;
    externalContract?: ExternalContractJson;
    internalContract?: InternalContractJson;
}

class Transformer {
    transform(session: WithdrawSession): SessionJson {
        const sessionJson: SessionJson = {
            id: session.id,
            internalAccount: session.internalAccountName,
            value: session.value,
            hashLock: session.hashLock,
            withdrawalFeeCurrency: session.withdrawalFeeCurrency,
            withdrawalFeeAmount: session.withdrawalFeeAmount,
            transactionFeeCurrency: session.transactionFeeCurrency,
            transactionFeeAmount: session.transactionFeeAmount,
            ethereumAddress: session.ethereumAddress,
            status: session.status
        };

        if (session.isPaid()) {
            const externalContract = session.externalContract as ExternalContract;
            sessionJson.externalContract = {
                txHash: externalContract.txHash
            };
        }

        if (session.isCreatedInternalBlockchain()) {
            const externalContract = session.externalContract as ExternalContract;
            sessionJson.externalContract = {
                txHash: externalContract.txHash
            };

            const internalContract = session.internalContract as InternalContract;
            sessionJson.internalContract = {
                id: internalContract.id
            };
        }

        if (session.isRedeemed()) {
            const externalContract = session.externalContract as ExternalContract;
            sessionJson.externalContract = {
                txHash: externalContract.txHash
            };

            const internalContract = session.internalContract as InternalContract;
            sessionJson.internalContract = {
                id: internalContract.id
            };
        }

        return sessionJson;
    }

    reverseTransform(sessionJson: SessionJson): WithdrawSession {
        const session = WithdrawSession.create(
            sessionJson.id,
            sessionJson.internalAccount,
            sessionJson.value,
            sessionJson.hashLock,
            sessionJson.withdrawalFeeCurrency,
            sessionJson.withdrawalFeeAmount,
            sessionJson.transactionFeeCurrency,
            sessionJson.transactionFeeAmount,
            sessionJson.ethereumAddress
        );

        if (sessionJson.status === STATUS.PAYED) {
            const externalContractJson = sessionJson.externalContract as ExternalContractJson;
            const externalContract = new ExternalContract(
                externalContractJson.txHash
            );
            session.pay(externalContract);
        }

        if (sessionJson.status === STATUS.CREATED_INTERNAL_BLOCKCHAIN) {
            const externalContractJson = sessionJson.externalContract as ExternalContractJson;
            const externalContract = new ExternalContract(
                externalContractJson.txHash
            );
            session.pay(externalContract);

            const internalContractJson = sessionJson.internalContract as InternalContractJson;
            const internalContract = new InternalContract(
                internalContractJson.id,
                ""
            );
            session.createdInternalBlockchain(internalContract);
        }

        if (sessionJson.status === STATUS.REDEEMED) {
            const externalContractJson = sessionJson.externalContract as ExternalContractJson;
            const externalContract = new ExternalContract(
                externalContractJson.txHash
            );
            session.pay(externalContract);

            const internalContractJson = sessionJson.internalContract as InternalContractJson;
            const internalContract = new InternalContract(
                internalContractJson.id,
                ""
            );
            session.createdInternalBlockchain(internalContract);

            session.redeemed();
        }

        return session;
    }
}

export default new Transformer();
