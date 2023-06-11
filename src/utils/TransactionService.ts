// import { mumbai } from "../models/Chain";
// import axios from "axios";

// export class TransactionService {
//   static API_URL = "https://polygon-mumbai.g.alchemy.com/v2";
//   static API_KEY = "mpvjvqD4pWuqbecrNS04vlSeFaRSPEfF";


//   static async getTransactions(address: string) {
//     const options = {
//       method: "GET",
//       url: `${TransactionService.API_URL}/${address}`,
//       params: { chain: mumbai.name.toLowerCase() },
//       headers: {
//         accept: "application/json",
//         "X-API-Key": TransactionService.API_KEY,
//       },
//     };
//     const response = await axios.request(options);
//     return response;
//   }
// }

import { mumbai } from "../models/Chain";

export class TransactionService {
  static API_URL = "https://polygon-mumbai.g.alchemy.com/v2";
  static API_KEY = "";

  static async getTransactions(address: string) {
    const url = `${TransactionService.API_URL}/address/${address}/transactions?chain=${mumbai.name.toLowerCase()}`;
    const options = {
      headers: {
        accept: "application/json",
        "X-API-Key": TransactionService.API_KEY,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error retrieving transactions: ${response.statusText}`);
    }
    return response.json();
  }
}
