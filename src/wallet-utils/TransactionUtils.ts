import { ethers, Wallet } from "ethers";
import { CHAINS_CONFIG, mumbai } from "../interfaces/Chain";

export async function sendToken(
  amount: number,
  from: string,
  to: string,
  privateKey: string
) {
  const chain = CHAINS_CONFIG[mumbai.chainId];
  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);//creating a
  const wallet: Wallet = new ethers.Wallet(privateKey, provider);

  const tx = { to, value: ethers.utils.parseEther(amount.toString()) };

  const transaction = await wallet.sendTransaction(tx);

  const receipt = await transaction.wait();

  return { transaction, receipt };
}
