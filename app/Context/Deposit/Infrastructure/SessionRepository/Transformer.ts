import Session from "../../Domain/Session";

interface sessionJson {
    id: string;
    smartContractAddress: string;
    receiverAddress: string;
    timeLock: number;
    status: number;
}

class Transformer {
    transform(session: Session): sessionJson {
        return {
            id: session.id,
            smartContractAddress: session.smartContractAddress,
            receiverAddress: session.receiverAddress,
            timeLock: session.timeLock,
            status: session.status
        };
    }

    reverseTransform(session: sessionJson): Session {
        return new Session(session.id, session.smartContractAddress, session.receiverAddress, session.timeLock);
    }
}

export default new Transformer();
