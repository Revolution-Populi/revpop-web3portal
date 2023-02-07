import moment from "moment";
import Session, {STATUS} from "../../Domain/Session";
import ExternalContract from "../../Domain/ExternalBlockchain/Contract";

export interface ExternalContractJson {
    txHash: string;
}

export interface SessionJson {
    id: string;
    internalAccount: string;
    value: string;
    hashLock: string;
    timeLock: number;
    status: number;
    externalContract?: ExternalContractJson;
}

class Transformer {
    transform(session: Session): SessionJson {
        const sessionJson: SessionJson = {
            id: session.id,
            internalAccount: session.internalAccount,
            value: session.value,
            hashLock: session.hashLock,
            timeLock: session.timeLock.unix(),
            status: session.status
        };

        if (session.isPaid()) {
            const externalContract = session.externalContract as ExternalContract;
            sessionJson.externalContract = {
                txHash: externalContract.txHash
            };
        }

        return sessionJson;
    }

    reverseTransform(sessionJson: SessionJson): Session {
        const session = Session.create(
            sessionJson.id,
            sessionJson.internalAccount,
            sessionJson.value,
            sessionJson.hashLock,
            moment.unix(sessionJson.timeLock)
        );

        if (sessionJson.status === STATUS.PAYED) {
            const externalContractJson = sessionJson.externalContract as ExternalContractJson;
            const externalContract = new ExternalContract(
                externalContractJson.txHash
            );
            session.pay(externalContract);
        }

        return session;
    }
}

export default new Transformer();
