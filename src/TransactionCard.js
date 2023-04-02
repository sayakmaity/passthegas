import React from "react";
import styled from "styled-components";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const Card = styled.div`
  background-color: rgba(255,225,225,0.7);
  color: #081056;
  border-radius: 8px;
  padding: 15px;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionCard = ({ transaction }) => {
  const { link, timestamp, type, gasUsed, percent, energy, success } = transaction;

  return (
    <Card>
      <Content>
        <p>Date: {timestamp}</p>
        <p>Transaction Type: {type}</p>
        <p>Gas Used: {gasUsed} gwei </p>
        <p>Percent of Allocated Gas Used: {percent}% </p>
        <p>Energy Consumption: {energy} kWh</p>
        <a href={link} target= "_blank" style={{"text-align":"center", "background-color":"#08105693", "color": "rgb(255, 225, 225)"}}>View on Etherscan</a>
      </Content>
      {success ? (
        <MdCheckCircle color="green" size={24} />
      ) : (
        <MdCancel color="red" size={24} />
      )}
    </Card>
  );
};

export default TransactionCard;
