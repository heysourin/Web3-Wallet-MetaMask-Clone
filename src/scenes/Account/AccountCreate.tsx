import React, { useState, useEffect } from "react";
import { generateKeys } from "../../utils/AccountUtils";

interface AccountData {
  seedPhrase: string;
  privateKey: string;
  address: string;
}
const AccountCreate: React.FC = () => {
  const [showSeedInput, setShowSeedInput] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState("");
  //   const [key, setKey] = useState("");
  const [accountData, setAccountData] = useState<AccountData | null>(null);

  const createAccount = () => {
    // Add your create account logic here
    const keys = generateKeys();
    console.log("Account created!", keys);
    // setKey(keys.seedPhrase);
    setAccountData(keys);
  };

  const recoverAccount = () => {
    setShowSeedInput(true);
  };

  const handleSeedPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeedPhrase(e.target.value);
  };

  const handleSeedPhraseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setSeedPhrase(seedPhrase);
    // Call generateKeys function here with the seedPhrase
    const recovery = generateKeys(seedPhrase);
    console.log("Recovery", recovery);
    setAccountData(recovery);
  };
  useEffect(() => {
    generateKeys(
      "cake element fiber torch cactus faith attitude album surround provide rib display"
    );
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Account Creation</h2>
      <button
        onClick={createAccount}
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Create Account
      </button>
      <button
        onClick={recoverAccount}
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Recover Account
      </button>
      {showSeedInput && (
        <form onSubmit={handleSeedPhraseSubmit} className="flex m-2">
          <input
            type="text"
            value={seedPhrase}
            onChange={handleSeedPhraseChange}
            // className="w-full px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
      <p className="text-gray-600 mt-2">
        A/C Address:{" "}
        <span className="text-gray-900 font-medium">
          {accountData?.address}
        </span>
      </p>

      <p className="text-gray-600 mt-2">
        Your 12 Phrase Mnemonic:{" "}
        <span className="text-gray-900 font-medium">
          {accountData?.seedPhrase}
        </span>
      </p>
    </div>
  );
};

export default AccountCreate;
