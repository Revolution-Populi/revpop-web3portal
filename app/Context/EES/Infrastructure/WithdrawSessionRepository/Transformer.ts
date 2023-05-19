import WithdrawSession, {STATUS} from "../../Domain/Withdraw/WithdrawSession";
import InternalContract from "../../Domain/InternalBlockchain/Contract";
import WithdrawContract from "../../Domain/ExternalBlockchain/WithdrawContract";

export interface ExternalContractJson {
    id: string;
    txHash: string | null;
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
        let sessionJson: SessionJson = {
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

        if (session.isReadyToSignInExternalBlockchain()) {
            sessionJson = this.setExternalContract(session, sessionJson);
            sessionJson = this.setInternalContract(session, sessionJson);
        }

        if (session.isRedeemed()) {
            const externalContract = session.externalContract as WithdrawContract;
            sessionJson.externalContract = {
                id: externalContract.id,
                txHash: externalContract.txHash
            };

            if (session.internalContract) {
                const internalContract = session.internalContract as InternalContract;
                sessionJson.internalContract = {
                    id: internalContract.id
                };
            }
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

        if (sessionJson.status === STATUS.SUBMITTED_TO_INTERNAL_BLOCKCHAIN) {
            session.submittedInInternalBlockchain();
        }

        if (
            sessionJson.status === STATUS.READY_TO_SIGN_IN_EXTERNAL_BLOCKCHAIN
        ) {
            session.submittedInInternalBlockchain();
            session.readyToSignInExternalBlockchain(
                WithdrawContract.create(sessionJson.externalContract?.id ?? "")
            );
        }

        if (sessionJson.status === STATUS.REDEEMED) {
            const externalContractJson = sessionJson.externalContract as ExternalContractJson;
            session.submittedInInternalBlockchain();
            session.readyToSignInExternalBlockchain(
                WithdrawContract.create(externalContractJson?.id ?? "")
            );
            session.redeem(externalContractJson.txHash ?? "");
        }

        return session;
    }

    public setExternalContract(
        session: WithdrawSession,
        sessionJson: SessionJson
    ): SessionJson {
        if (session.externalContract) {
            const externalContract = session.externalContract as WithdrawContract;
            sessionJson.externalContract = {
                id: externalContract.id,
                txHash: externalContract.txHash
            };
        }
        return sessionJson;
    }

    public setInternalContract(
        session: WithdrawSession,
        sessionJson: SessionJson
    ): SessionJson {
        if (session.internalContract) {
            const internalContract = session.internalContract as InternalContract;
            sessionJson.internalContract = {
                id: internalContract.id
            };
        }
        return sessionJson;
    }
}

export default new Transformer();
