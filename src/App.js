import React, { useState, useEffect } from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Navbar, Nav } from "react-bootstrap";
import styled from "styled-components";
import TransactionCard from "./TransactionCard";
import LineGraph from "./line";
// import { connectWallet, getTransactions } from "./wallet";
import { ethers } from "ethers";

import "./styles/Home.css";
import "./styles/globals.css";
// Add this new styled-component

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const LargeStat = styled.div`
  font-size: 96px;
  font-weight: bold;
  text-align: center;
  // margin-bottom: 10px;
`;

const SmallStatsContainer = styled.div`
  display: flex;
  gap: 30px; // Increase spacing between each small stat
  justify-content: space-between;
  width: 100%;
`;

const SmallStat = styled.div`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
`;
const Container = styled.div`
  max-width: 1300px;
  overflow-x: scroll;
  padding: 10px;
  display: flex;
  border: solid 1px;
  border-color: rgba(255, 225, 225, 0.8);
  border-radius: 10px;
  text-align: left;
`;

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [stats, setStats] = useState({ transactions: 0, gwei: 0 });
  const [graphData, setGraphData] = useState([]);

  const ETHERSCAN_API_KEY = "247XENS1UNZU23RTB3WB2Y4ZDHWV58MH1N";

  function calculateStatsForPastMonth(transactions) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return transactions.reduce(
      (acc, tx) => {
        if (new Date(tx.timestamp) > oneMonthAgo) {
          console.log(2)
          acc.transactions += 1;
          acc.energy += parseFloat(tx.energy);
          acc.gwei += parseFloat((tx.gasUsed * tx.gasPrice) / 10 ** 9);
        }
        return acc;
      },
      { transactions: 0, energy: 0, gwei: 0 }
    );
  }
  const addr = useAddress();
  console.log(addr);

  async function fetchTransactionData(address) {
    if (address) {
      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
      const getTransactionType = (input) => {
        if (input === '0x') {
          return 'Normal';
        } else if (input.startsWith('0x')) {
          return 'Smart Contract';
        } else {
          return 'Internal';
        }
      };
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "1") {
          // Process the transaction data as needed
        const processedTransactions = data.result.map((tx) => ({
          timestamp: new Date(tx.timeStamp * 1000).toDateString(),
          type: getTransactionType(tx.input),
          gasUsed: tx.gasUsed,
          gasPrice: tx.gasPrice, // Add the gas price to the transaction data
          percent: parseFloat((tx.gasUsed / tx.gas) * 100).toFixed(2),
          energy: parseFloat((tx.gasUsed * tx.gasPrice) / 10 ** 15).toFixed(2),
          success: tx.isError === "0",
        }));

        const graphDataProcessing = data.result.map((tx) => ({
          timestamp: String(tx.timeStamp * 1000),
          energy: parseFloat((tx.gasUsed * tx.gasPrice) / 10 ** 15).toFixed(2)
        }));
        setGraphData(graphDataProcessing)
        console.log(graphDataProcessing)
        

        // Calculate the stats for the past month
        const stats = calculateStatsForPastMonth(processedTransactions);
        setTotalEnergy(stats.energy);
        setStats({ transactions: stats.transactions, gwei: stats.gwei });

        return processedTransactions;
        } else {
          console.error("Error fetching transactions:", data.message);
          return [];
        }
      }
      catch (err) {
        console.error("Error fetching transactions:", err);
        return [];
      }
    }
  }

  // async function fetchTransactionData(address) {
  //   const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
  //   const getTransactionType = (input) => {
  //     if (input === "0x") {
  //       return "Normal";
  //     } else if (input.startsWith("0x")) {
  //       return "Smart Contract";
  //     } else {
  //       return "Internal";
  //     }
  //   };

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     if (data.status === "1") {
  //       // Process the transaction data as needed
  //       const processedTransactions = data.result.map((tx) => ({
  //         timestamp: new Date(tx.timeStamp * 1000).toDateString(),
  //         type: getTransactionType(tx.input),
  //         gasUsed: tx.gasUsed,
  //         percent: parseFloat((tx.gasUsed / tx.gas) * 100).toFixed(2),
  //         energy: parseFloat((tx.gasUsed * tx.gasPrice) / 10 ** 15).toFixed(2),
  //         success: tx.isError === "0",
  //       }));

  //       // Calculate the total energy consumption for the past month
  //       const totalEnergy = calculateEnergyForPastMonth(processedTransactions);
  //       setTotalEnergy(totalEnergy);

  //       return processedTransactions;
  //     } else {
  //       console.error("Error fetching transactions:", data.message);
  //       return [];
  //     }
  //   } catch (err) {
  //     console.error("Error fetching transactions:", err);
  //     return [];
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          // const address = await signer.getAddress();
          const address = "0x97c46EeC87a51320c05291286f36689967834854";

          // Replace the following line with the API call to fetch transactions
          if (addr) {
            const data = await fetchTransactionData(addr);
            setTransactions(data);
          }
        } catch (err) {
          console.error("Error connecting wallet:", err);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar bg="black" expand="lg">
        <Navbar.Brand className="text-white" href="#home">
          PassTheGas
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">{/* Add any navigation items here */}</Nav>
          <Nav>
            <ConnectWallet />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container">
        <main className="main">
          <h1 className="title">Welcome to PassTheGas!</h1>
          {/* <h1 className="title">Welcome to PassTheGas!</h1> */}
          {/* Add this block for displaying the statistics */}
          {addr ? (
          <div>
          <StatsContainer>
            <LargeStat>{totalEnergy.toFixed(2).toLocaleString()} kWh</LargeStat>
            <h4>Used over the past one month in Ethereum transactions</h4>
            <SmallStatsContainer>
              <SmallStat>
                Transactions: {stats.transactions.toLocaleString()}
              </SmallStat>
              <SmallStat>
                Gwei: {stats.gwei.toFixed(2).toLocaleString()}
              </SmallStat>
            </SmallStatsContainer>
          </StatsContainer>

          <h2>Recent Transaction Data</h2>
            <Container>
              {transactions.map((transaction, index) => (
                <TransactionCard key={index} transaction={transaction} />
              ))}
            </Container>
            <LineGraph data={graphData}/>
            </div>
          ) : (
            <h2 style={{"text-align": "center"}}> Connect your Wallet to See your stats! </h2>
          )}
        </main>
      </div>
    </>
  );
}
