// import {expect} from "chai";
// import {Session} from "../../../../../app/Context/Deposit";
// import moment from "moment/moment";
// import transformer, {
//     ContractJson,
//     SessionJson
// } from "../../../../../app/Context/Deposit/Infrastructure/SessionRepository/Transformer";
// import Contract from "../../../../../app/Context/Deposit/Domain/Contract";
// import {STATUS} from "../../../../../app/Context/Deposit/Domain/Session";

// describe("Transformer", () => {
//     const sessionId = "0xe7435f68554b20f8c85606a014c258f6e66ed787284e6601a95a769558c62ff1";
//     const contractAddress = "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144";
//     const receiverAddress = "0x8509C2c215373e7dA48bcB2745AEDA6BC9096144";
//     const minimumAmount = "10000000000000000";
//     const minimumTimeLock = moment()
//         .add(1, "month")
//         .unix();
//     const txHash = "0x18028d83a769276209fcc19610dfb65b7e33acce9126f916dd6f410de5add27d";
//     const sender = "0x9b1eaae87cc3a041c4cef02386109d6ace5e198e";
//     const amount = "10000000000000000";
//     const hashLock = "0x14383da019a0dafdf459d62c6f9c1aaa9e4d0f16554b5c493e85eb4a3dfac55c";
//     const timeLock = moment()
//         .add(1, "month")
//         .unix();

//     describe("transform", () => {
//         let session: Session;

//         beforeEach(() => {
//             session = new Session(sessionId, contractAddress, receiverAddress, minimumAmount, minimumTimeLock);
//         });

//         it("should transform not payed session", async () => {
//             const sessionJson = transformer.transform(session);

//             expect(sessionJson.id).equals(sessionId);
//             expect(sessionJson.smartContractAddress).equals(contractAddress);
//             expect(sessionJson.receiverAddress).equals(receiverAddress);
//             expect(sessionJson.minimumAmount).equals(minimumAmount);
//             expect(sessionJson.minimumTimeLock).equals(minimumTimeLock);

//             expect(sessionJson.txHash).null;
//             expect(sessionJson.contract).null;
//         });

//         it("should transform payed session", async () => {
//             const contract = new Contract(sender, receiverAddress, amount, hashLock, timeLock);
//             session.pay(txHash, contract);

//             const sessionJson = transformer.transform(session);

//             expect(sessionJson.txHash).equals(txHash);
//             const contractJson = sessionJson.contract;
//             expect(contractJson).not.null;
//             expect(contractJson?.sender).equals(sender);
//             expect(contractJson?.receiver).equals(receiverAddress);
//             expect(contractJson?.amount).equals(amount);
//             expect(contractJson?.timeLock).equals(timeLock);
//             expect(contractJson?.hashLock).equals(hashLock);
//         });
//     });

//     describe("reverseTransform", () => {
//         let sessionJson: SessionJson;

//         beforeEach(() => {
//             sessionJson = {
//                 id: sessionId,
//                 smartContractAddress: contractAddress,
//                 receiverAddress: receiverAddress,
//                 minimumAmount: minimumAmount,
//                 minimumTimeLock: minimumTimeLock,
//                 txHash: null,
//                 contract: null,
//                 status: 1
//             };
//         });

//         it("should transform not payed session", async () => {
//             const session = transformer.reverseTransform(sessionJson);

//             expect(session.id).equals(sessionId);
//             expect(session.smartContractAddress).equals(contractAddress);
//             expect(session.receiverAddress).equals(receiverAddress);
//             expect(session.minimumAmount).equals(minimumAmount);
//             expect(session.minimumTimeLock).equals(minimumTimeLock);

//             expect(session.txHash).null;
//             expect(session.contract).null;
//             expect(session.canBePaid()).true;
//         });

//         it("should transform payed session", async () => {
//             const contractJson: ContractJson = {
//                 sender,
//                 receiver: receiverAddress,
//                 amount,
//                 hashLock,
//                 timeLock
//             };
//             sessionJson.status = STATUS.PAYED;
//             sessionJson.txHash = txHash;
//             sessionJson.contract = contractJson;

//             const session = transformer.reverseTransform(sessionJson);

//             expect(session.txHash).not.null;
//             expect(session.contract).not.null;
//             expect(session.canBePaid()).false;
//         });
//     });
// });
