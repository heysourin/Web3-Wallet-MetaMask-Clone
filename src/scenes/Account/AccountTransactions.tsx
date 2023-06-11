import { ethers } from "ethers";
import React, { useState, useEffect, useCallback } from "react";
import { Account } from "../../models/Account";
import { mumbai } from "../../models/Chain";
import { TransactionService } from "../../utils/TransactionService";
import { shortenAddress } from "../../utils/AccountUtils";

interface Transaction {
  hash: string;
  from_address: string;
  to_address: string;
  value: string;
  block_timestamp: string;
}

type AccountTransactionsProps = {
  //   account: Account;
  account: {
    privateKey: string;
    address: string;
    balance: string;
  };
};

const AccountTransactions: React.FC<AccountTransactionsProps> = ({
  account,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [networkResponse, setNetworkResponse] = useState<{
    status: null | "pending" | "complete" | "error";
    message: string | React.ReactElement;
  }>({
    status: null,
    message: "",
  });

  const getTransactions = useCallback(async () => {
    setNetworkResponse({
      status: "pending",
      message: "",
    });
    try {
      const response = await TransactionService.getTransactions(
        account.address
      );
      setTransactions(response.data.result);
    } catch (error) {
      console.log({ error });
      setNetworkResponse({
        status: "error",
        message: JSON.stringify(error),
      });
    } finally {
      setNetworkResponse({
        status: "complete",
        message: "",
      });
    }
  }, [account.address]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div>
        {networkResponse.status === "complete" && transactions?.length === 0 && (
          <p>No transaction found!!!</p>
          )}

        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={getTransactions}
          disabled={networkResponse.status === "pending"}
        >
          Refresh Transactions
        </button>

        {networkResponse.status && (
          <>
            {networkResponse.status === "pending" && (
              <p>Loading transactions...</p>
              )}
            {networkResponse.status === "error" && (
              <p className="text-red-500">
                Some error occurred while loading tokens: {networkResponse.message}
              </p>
            )}
          </>
        )}
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2">Hash</th>
            <th className="border-b-2 border-gray-300 py-2">From</th>
            <th className="border-b-2 border-gray-300 py-2">To</th>
            <th className="border-b-2 border-gray-300 py-2">Value</th>
            <th className="border-b-2 border-gray-300 py-2">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.hash}>
              <td className="border-b border-gray-300 py-2">
                <a
                  href={`${mumbai.blockExplorerUrl}/tx/${transaction.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {transaction.hash}
                </a>
              </td>

              <td className="border-b border-gray-300 py-2">
                <a
                  href={`${mumbai.blockExplorerUrl}/address/${transaction.from_address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {shortenAddress(transaction.from_address)}
                </a>
                {transaction.from_address.toLowerCase() === account.address.toLowerCase() ? (
                  <span className="inline-block px-2 py-1 text-white bg-yellow-500 rounded-md ml-2">
                    OUT
                  </span>
                ) : (
                  <span className="inline-block px-2 py-1 text-white bg-green-500 rounded-md ml-2">
                    IN
                  </span>
                )}
              </td>

              <td className="border-b border-gray-300 py-2">
                <a
                  href={`${mumbai.blockExplorerUrl}/address/${transaction.to_address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  >
                  {shortenAddress(transaction.to_address)}
                </a>
              </td>
              <td className="border-b border-gray-300 py-2">
                {ethers.utils.formatEther(transaction.value)} ETH
              </td>
              <td className="border-b border-gray-300 py-2">
                {new Date(transaction.block_timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTransactions;
// return (
//   <div>
//     <h2>Transactions</h2>
//     <div>
//       {networkResponse.status === "complete" &&
//         transactions?.length === 0 && <p>No transaction found!!!</p>}

//       <button
//         type="button"
//         className=""
//         onClick={getTransactions}
//         disabled={networkResponse.status === "pending"}
//       >
//         Refresh Transactions
//       </button>

//       {networkResponse.status && (
//         <>
//           {networkResponse.status === "pending" && (
//             <p>Loading transctions...</p>
//           )}
//           {networkResponse.status === "error" && (
//             <p>
//               Some error occured while loading tokens:{" "}
//               {networkResponse.message}
//             </p>
//           )}
//         </>
//       )}
//     </div>

//     <table>
//       <thead>
//         <th>Hash</th>
//         <th>From</th>
//         <th>To</th>
//         <th>Value</th>
//         <th>Timestamp</th>
//       </thead>

//       <tbody>
//         {transactions?.map((transaction) => (
//           <tr key={transaction.hash}>
//             <td>
//               <a
//                 href={`${mumbai.blockExplorerUrl}/tx/${transaction.hash}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               ></a>
//             </td>

//             <td>
//               <a
//                 href={`${mumbai.blockExplorerUrl}/address/${transaction.from_address}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {shortenAddress(transaction.from_address)}
//               </a>
//               {transaction.from_address.toLowerCase() ===
//               account.address.toLowerCase() ? (
//                 <span className="badge rounded-pill bg-warning">OUT</span>
//               ) : (
//                 <span className="badge rounded-pill bg-success">IN</span>
//               )}
//             </td>

//             <td>
//               <a
//                 href={`${mumbai.blockExplorerUrl}/address/${transaction.to_address}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {shortenAddress(transaction.to_address)}
//               </a>
//             </td>
//             <td>{ethers.utils.formatEther(transaction.value)} ETH</td>
//             <td>{new Date(transaction.block_timestamp).toLocaleString()}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );
