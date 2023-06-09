import { ethers } from "ethers";

export const generateKeys = (seedPhrase?: string) => {
  let wallet;

  if (seedPhrase) {
    wallet = ethers.Wallet.fromMnemonic(seedPhrase);
  } else {
    wallet = ethers.Wallet.createRandom();
    seedPhrase = wallet.mnemonic.phrase;
  }

  const privateKey = wallet.privateKey;
  const address = wallet.address;

  return { seedPhrase, privateKey, address };
};
