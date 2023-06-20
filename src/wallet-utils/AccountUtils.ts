import { Wallet } from "ethers";

interface Account {
  privateKey: string;
  address: string;
  balance: string;
}

export function generateAccount(
  seedPhrase: string = "",
  index: number = 0
): { account: Account; seedPhrase: string } {
  let wallet: Wallet;

  if (seedPhrase === "") {
    seedPhrase = Wallet.createRandom().mnemonic.phrase;
  }

  // If the seed phrase does not contain spaces, it is likely a mnemonic
  wallet = seedPhrase.includes(" ")
    ? Wallet.fromMnemonic(seedPhrase, `m/44'/60'/0'/0/${index}`)
    : new Wallet(seedPhrase);

  // console.log("hehe",wallet);

  const { address } = wallet; // we are capturing address variable from 'wallet' object
  
  const account = { address, privateKey: wallet.privateKey, balance: "0" };

  // If the seedphrase does not include spaces then it's actually a private key, so return a blank string.
  return { account, seedPhrase: seedPhrase.includes(" ") ? seedPhrase : "" };
}


