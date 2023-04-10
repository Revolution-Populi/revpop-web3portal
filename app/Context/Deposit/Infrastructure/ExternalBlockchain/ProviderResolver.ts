// import ProviderInterface from "../Provider/ProviderInterface";
// import Web3Provider from "./Web3";
// import StubProvider from "./Stub";

// class ProviderResolver {
//     private _stubProvider: StubProvider = new StubProvider();

//     resolve(provider: string): ProviderInterface {
//         switch (provider) {
//             case "metamask":
//                 return new Web3Provider();
//             case "stub":
//                 return this._stubProvider;
//             default:
//                 throw new Error(`Provider ${provider} not found.`);
//         }
//     }

//     get stubProvider(): StubProvider {
//         return this._stubProvider;
//     }
// }

// export default new ProviderResolver();
