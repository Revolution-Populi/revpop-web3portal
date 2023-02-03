import moment from "moment";
import Session, {STATUS} from "../../Domain/Session";

export interface ContractJson {
    sender: string;
    receiver: string;
    amount: string;
    hashLock: string;
    timeLock: number;
}

export interface SessionJson {
    id: string;
    internalAccount: string;
    value: string;
    hashLock: string;
    timeLock: number;
}

class Transformer {
    transform(session: Session): SessionJson {
        return {
            id: session.id,
            internalAccount: session.internalAccount,
            value: session.value,
            hashLock: session.hashLock,
            timeLock: session.timeLock.unix()
        };
    }

    reverseTransform(sessionJson: SessionJson): Session {
        const session = Session.create(
            sessionJson.id,
            sessionJson.internalAccount,
            sessionJson.value,
            sessionJson.hashLock,
            moment.unix(sessionJson.timeLock)
        );

        // if (sessionJson.status === STATUS.PAYED && sessionJson.txHash && sessionJson.contract) {
        //     const contract = new Contract(
        //         sessionJson.contract.sender,
        //         sessionJson.contract.receiver,
        //         sessionJson.contract.amount,
        //         sessionJson.contract.hashLock,
        //         sessionJson.contract.timeLock
        //     );

        //     session.pay(sessionJson.txHash, contract);
        // }

        return session;
    }
}

export default new Transformer();
