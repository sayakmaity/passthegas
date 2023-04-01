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
  max-height: 400px;
  overflow-y: scroll;
  padding: 10px;
`;

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  const ETHERSCAN_API_KEY = "247XENS1UNZU23RTB3WB2Y4ZDHWV58MH1N";

  async function fetchTransactionData(address) {
    const url = `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "1") {
        // Process and return the transaction data as needed
        return data.result.map((tx) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: ethers.utils.formatEther(tx.value),
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
          const address = await signer.getAddress();

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
          <p className="description">
            Get started by configuring your desired network in{" "}
            <code className="code">src/index.js</code>, then modify the{" "}
            <code className="code">src/App.js</code> file!
          </p>
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
