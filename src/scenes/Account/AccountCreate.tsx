import React, { useState, useEffect } from "react";
import { generateAccount } from "../../utils/AccountUtils";
import AccountDetails from "./AccountDetails";

interface Account {
  privateKey: string;
  address: string;
  balance: string;
}

const AccountCreate: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState("");
  const [account, setAccount] = useState<Account | null>(null);

  const createAccount = () => {
    // Add your create account logic here
    const account = generateAccount();
    console.log("Account created!", account);
    setSeedPhrase(account.seedPhrase);
    setAccount(account.account);
  };

  const showInputFunction = () => {
    setShowInput(true);
  };

  const handleSeedPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeedPhrase(e.target.value);
  };

  const handleSeedPhraseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = generateAccount(seedPhrase);
    console.log("Recovery", account);
    setSeedPhrase(account.seedPhrase);
    setAccount(account.account);
  };
  useEffect(() => {
    generateAccount(
      "cake element fiber torch cactus faith attitude album surround provide rib display"
    );
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Pixel Web3 Wallet</h2>
      <button
        onClick={createAccount}
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Create Account
      </button>
      <button
        onClick={showInputFunction}
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Recover Account
      </button>
      {showInput && (
        <form onSubmit={handleSeedPhraseSubmit} className="flex m-2">
          <input
            type="text"
            value={seedPhrase}
            onChange={handleSeedPhraseChange}
            className="bg-transparent border border-gray-300 rounded-md w-full py-2 px-4 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-2"
            placeholder="Enter your text"
          />
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 m-2"
          >
            Submit
          </button>
        </form>
      )}

      <div>
        <p className=" text-gray-900 font-medium">A/C Address: </p>
        <span className="text-gray-600 mt-2">{account?.address}</span>
      </div>

      <div>
        <p className="text-gray-900  font-medium">Your 12 Phrase Mnemonic: </p>
        <span className="text-gray-600 text-normal">{seedPhrase}</span>
      </div>

      <hr />
      {account && <AccountDetails account={account} />}
    </div>
  );
};

export default AccountCreate;

//text-gray-600 mt-2
