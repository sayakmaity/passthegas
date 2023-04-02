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
  const { timestamp, from, to, value, success } = transaction;

  return (
    <Card>
      <Content>
        <p>Date: {timestamp}</p>
        <p>From: {from}</p>
        <p>To: {to}</p>
        <p>Value: {value} ETH</p>
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
