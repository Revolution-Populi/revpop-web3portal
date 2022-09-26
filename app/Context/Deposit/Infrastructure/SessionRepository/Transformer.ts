import Session, {STATUS} from "../../Domain/Session";
import Contract from "../../Domain/Contract";

export interface ContractJson {
    sender: string;
    receiver: string;
    amount: string;
    hashLock: string;
    timeLock: number;
}

export interface SessionJson {
    id: string;
    smartContractAddress: string;
    receiverAddress: string;
    minimumAmount: string;
    minimumTimeLock: number;
    txHash: string | null;
    contract: ContractJson | null;
    status: number;
}

class Transformer {
    transform(session: Session): SessionJson {
        let contractJson: ContractJson | null = null;
        if (session.txHash && session.contract !== null) {
            contractJson = {
                sender: session.contract.sender,
                amount: session.contract.amount,
                receiver: session.contract.receiver,
                hashLock: session.contract.hashLock,
                timeLock: session.contract.timeLock
            };
        }

        return {
            id: session.id,
            smartContractAddress: session.smartContractAddress,
            receiverAddress: session.receiverAddress,
            minimumAmount: session.minimumAmount,
            minimumTimeLock: session.minimumTimeLock,
            txHash: session.txHash,
            contract: contractJson,
            status: session.status
        };
    }

    reverseTransform(sessionJson: SessionJson): Session {
        const session = new Session(
            sessionJson.id,
            sessionJson.smartContractAddress,
            sessionJson.receiverAddress,
            sessionJson.minimumAmount,
            sessionJson.minimumTimeLock
        );

        if (sessionJson.status === STATUS.PAYED && sessionJson.txHash && sessionJson.contract) {
            const contract = new Contract(
                sessionJson.contract.sender,
                sessionJson.contract.receiver,
                sessionJson.contract.amount,
                sessionJson.contract.hashLock,
                sessionJson.contract.timeLock
            );

            session.pay(sessionJson.txHash, contract);
        }

        return session;
    }
}

export default new Transformer();
