import React, { useEffect, useState } from "react";
import axios from "axios";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  isError: string;
  timeStamp: string;
}

interface TransactionTableProps {
  address: string;
}

const MUMBAI_API_KEY = "<YOUR-API-KEY>";
const MUMBAI_API_BASE_URL = "https://api-testnet.polygonscan.com/api";

const TransactionDetails: React.FC<TransactionTableProps> = ({ address }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const endpoint = `?module=account&action=txlist&address=${address}&page=1&offset=10&sort=desc&apikey=${MUMBAI_API_KEY}`;
      const url = `${MUMBAI_API_BASE_URL}${endpoint}`;

      try {
        const response = await axios.get(url);
        const transactionData: Transaction[] = response.data.result;
        setTransactions(transactionData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [address]);

  return (
    // <table>
    //   <thead>
    //     <tr>
    //       <th>No.</th>
    //       <th>Hash</th>
    //       <th>From</th>
    //       <th>To</th>
    //       <th>Status</th>
    //       <th>Timestamp</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {transactions.map((transaction, index) => (
    //       <tr key={index}>
    //         <td>{index + 1}</td>
    //         <td>{`${transaction.hash.slice(0, 5)}...${transaction.hash.slice(
    //           -3
    //         )}`}</td>
    //         <td>{`${transaction.from.slice(0, 5)}...${transaction.from.slice(
    //           -3
    //         )}`}</td>
    //         <td>{`${transaction.to.slice(0, 5)}...${transaction.to.slice(
    //           -3
    //         )}`}</td>
    //         {/* <td>{transaction.isError}</td> */}
    //         {transaction.isError === "0" ? <td>✅</td> : <td>❌</td>}
    //         <td>{parseInt(transaction.timeStamp, 10)}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>

    <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="py-2 px-4">No.</th>
        <th className="py-2 px-4">Hash</th>
        <th className="py-2 px-4">From</th>
        <th className="py-2 px-4">To</th>
        <th className="py-2 px-4">Status</th>
        <th className="py-2 px-4">Timestamp</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((transaction, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
          <td className="py-2 px-4">{index + 1}</td>
          <td className="py-2 px-4">
            {`${transaction.hash.slice(0, 5)}...${transaction.hash.slice(-3)}`}
          </td>
          <td className="py-2 px-4">
            {`${transaction.from.slice(0, 5)}...${transaction.from.slice(-3)}`}
          </td>
          <td className="py-2 px-4">
            {`${transaction.to.slice(0, 5)}...${transaction.to.slice(-3)}`}
          </td>
          <td className="py-2 px-4">
            {transaction.isError === '0' ? '✅' : '❌'}
          </td>
          <td className="py-2 px-4">{transaction.timeStamp}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default TransactionDetails;

