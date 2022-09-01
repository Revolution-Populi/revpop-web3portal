import SendTxHash from "./SendTxHash";

export default class SendTxHashHandler {
    async execute(command: SendTxHash): Promise<void> {
        console.log(`Send tx hash: ${command.txHash}`);
    }
}
