import React, { useState, useEffect } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Navbar, Nav } from "react-bootstrap";
import styled from "styled-components";
import TransactionCard from "./TransactionCard";
// import { connectWallet, getTransactions } from "./wallet";
import { ethers } from "ethers";

import "./styles/Home.css";
import "./styles/globals.css";

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

  const ETHERSCAN_API_KEY = "247XENS1UNZU23RTB3WB2Y4ZDHWV58MH1N";

  async function fetchTransactionData(address) {
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
        // Process and return the transaction data as needed
        return data.result.map((tx) => ({
          timestamp: (new Date(tx.timeStamp * 1000)).toDateString(),
          type: getTransactionType(tx.input),
          gasUsed: tx.gasUsed,
          percent: parseFloat(tx.gasUsed / tx.gas * 100).toFixed(2),
          energy: parseFloat(tx.gasUsed * tx.gasPrice / 10**15).toFixed(2),
          success: tx.isError === "0",
        }));
      } else {
        console.error("Error fetching transactions:", data.message);
        return [];
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          // const address = await signer.getAddress();
          const address = '0x97c46EeC87a51320c05291286f36689967834854'

          // Replace the following line with the API call to fetch transactions
          const data = await fetchTransactionData(address);

          setTransactions(data);
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
          <h2>Recent Transaction Data</h2>
          <hr/>
          <Container>
            {transactions.map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} />
            ))}
          </Container>
        </main>
      </div>
    </>
  );
}
