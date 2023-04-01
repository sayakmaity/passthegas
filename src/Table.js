import { useState, useEffect } from 'react';
import axios from 'axios';

function Table(address) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (address && address["address"]) {
          console.log(address);
        }
        else {
          address = {"address": '0x97c46EeC87a51320c05291286f36689967834854'}
        }
        const response = await axios.get('https://api.etherscan.io/api', {
          params: {
            module: 'account',
            action: 'txlist',
            address: address["address"],
            startblock: 0,
            endblock: 99999999,
            sort: 'asc',
            apikey: 'QU2TH6PVGD3TD29B2RVVEI267FYR1KFP1J',
          },
        });

        // Extract the "gas" and "gasUsed" fields from the response data
        const transactionsWithGas = response.data.result.map(transaction => ({
          ...transaction,
          gas: parseInt(transaction.gas),
          gasUsed: parseInt(transaction.gasUsed),
        }));

        // Set the transactions state to the new data
        setTransactions(transactionsWithGas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Block</th>
          <th>TxHash</th>
          <th>Gas</th>
          <th>Gas Used</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.hash}>
            <td>{transaction.blockNumber}</td>
            <td>{transaction.hash}</td>
            <td>{transaction.gas}</td>
            <td>{transaction.gasUsed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;